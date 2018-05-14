import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Word, WordLink} from "./entity/word";
import {ResponsePagingWrapper} from "../../util/entity";
import {of as observableOf} from 'rxjs/observable/of';
import {Dictionary} from "./entity/dictionary";
import {RowLink} from "../component/word/add/add.word.component";
import {Subject} from "rxjs/Subject";

@Injectable({
    providedIn: 'root',
})
export class WordService {
    private dictionary: Dictionary;
    public wordLinksChange = new Subject();

    constructor() {
        this.dictionary = new Dictionary(1, 'test');
        this.addSimpleWordLink("world", "мир");
        this.addSimpleWordLink("tree", "дерево");
        this.addWordLink(["key"], ["источник", "ключ"]);
    }

    getWords(sort: string, order: string, page: number, pageSize: number): Observable<ResponsePagingWrapper<WordLink>> {
        let result = new ResponsePagingWrapper(this.dictionary.wordLinks.length, this.dictionary.wordLinks);
        return observableOf(result);
    }

    addSimpleWordLink(from: string, to: string) {
        this.addWordLink([from], [to]);
    }

    addWordLink(from: string[], to: string[]) {
        let fromWords: Word[] = [];
        let toWords: Word[] = [];
        for (let text of from) {
            if (!text)
                continue;
            text = text.trim();
            if (text.length == 0)
                continue;

            let word = this.dictionary.wordMap.get(text);
            if (word == null) {
                word = new Word(text);
                this.dictionary.wordMap.set(text, word);
            }
            fromWords.push(word);
        }
        for (let text of to) {
            if (!text)
                continue;
            text = text.trim();
            if (text.length == 0)
                continue;

            let word = this.dictionary.wordMap.get(text);
            if (word == null) {
                word = new Word(text);
                this.dictionary.wordMap.set(text, word);
            }
            toWords.push(word);
        }
        this.dictionary.wordLinks.push(new WordLink(fromWords, toWords));
        this.wordLinksChange.next();
    }

    createLink(link: RowLink) {
        let from: string[] = [];
        let to: string[] = [];
        link.from.forEach(ref => from.push(ref.text));
        link.to.forEach(ref => to.push(ref.text));
        this.addWordLink(from, to);
    }
}
