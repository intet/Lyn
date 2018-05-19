import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Word, WordLink} from "./entity/word";
import {ResponsePagingWrapper} from "../../shared/util/entity";
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

    private static getWord(dictionary: Dictionary, text: string, isFrom: boolean) {
        if (!text)
            return null;
        text = text.trim();
        if (text.length == 0)
            return null;

        const key = text.toLocaleLowerCase();
        const map = (isFrom ? dictionary.wordMapFrom : dictionary.wordMapTo);
        let word = map.get(key);
        if (word == null) {
            word = new Word(text);
            map.set(key, word);
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
                switchMap((dict: Dictionary) => {
                    return dict.sortLinks(sort, asc);
                }),
                map((d: Dictionary) => {
                        return new ResponsePagingWrapper(d.wordLinks.length, d.wordLinks);
                    }
                ))
            ;
    }

    private addWordLink(from: string[], to: string[]) {
        this.dictionaryService.getDictionary().subscribe((dictionary: Dictionary) => {
            const fromWords: Word[] = [];
            const toWords: Word[] = [];
            for (const text of from) {
                let word = WordService.getWord(dictionary, text, true);
                if (word != null)
                    fromWords.push(word);
            }
            for (const text of to) {
                let word = WordService.getWord(dictionary, text, false);
                if (word != null)
                    toWords.push(word);
            }

            let link = new WordLink(fromWords, toWords);
            this.sendService.addLink(dictionary, link);
            dictionary.addWord(link);
            this.wordLinksChange.next();
        });
    }


}
