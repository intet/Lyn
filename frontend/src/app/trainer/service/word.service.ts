import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Word, WordLink} from "./entity/word";
import {ResponsePagingWrapper} from "../../util/entity";
import {Dictionary} from "./entity/dictionary";
import {RowLink} from "../component/word/add/add.word.component";
import {Subject} from "rxjs/Subject";
import {SyncApiService} from "./send/api.sync.service";
import {DictionaryService} from "./dictionary.service";
import {map, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class WordService {
    public wordLinksChange = new Subject();

    constructor(private sendService: SyncApiService, private dictionaryService: DictionaryService) {
        /* this.dictionary = new Dictionary(1, 'test');
         this.addSimpleWordLink("world", "мир");
         this.addSimpleWordLink("tree", "дерево");
         this.addWordLink(["key"], ["источник", "ключ"]);*/
    }

    private static getWord(dictionary: Dictionary, text: string) {
        if (!text)
            return null;
        text = text.trim();
        if (text.length == 0)
            return null;

        let key = text.toLocaleLowerCase();
        let word = dictionary.wordMap.get(key);
        if (word == null) {
            word = new Word(text);
            dictionary.wordMap.set(key, word);
        }
        return word;
    }

    createLink(link: RowLink) {
        let from: string[] = [];
        let to: string[] = [];
        link.from.forEach(ref => from.push(ref.text));
        link.to.forEach(ref => to.push(ref.text));
        this.addWordLink(from, to);
    }


    private addSimpleWordLink(from: string, to: string) {
        this.addWordLink([from], [to]);
    }

    getWords(sort: string, asc: boolean, page: number, pageSize: number): Observable<ResponsePagingWrapper<WordLink>> {
        return this.dictionaryService.getDictionary()
            .pipe<Dictionary, ResponsePagingWrapper<WordLink>>(
                switchMap((d) => {
                    let dict = d as Dictionary;
                    return dict.sortLinks(sort, asc);
                }),
                map((d) => {
                        return new ResponsePagingWrapper(d.wordLinks.length, d.wordLinks);
                    }
                ))
            ;
    }

    private addWordLink(from: string[], to: string[]) {
        this.dictionaryService.getDictionary().subscribe(dictionary => {
            let fromWords: Word[] = [];
            let toWords: Word[] = [];
            from.forEach(text => {
                let word = WordService.getWord(dictionary, text);
                if (word != null)
                    fromWords.push(word);
            });

            to.forEach(text => {
                let word = WordService.getWord(dictionary, text);
                if (word != null)
                    toWords.push(word);
            });
            let link = new WordLink(fromWords, toWords);
            this.sendService.addLink(dictionary.id, link);
            dictionary.wordLinks.push(link);
            this.wordLinksChange.next();
        });
    }


}
