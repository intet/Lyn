import {Language} from "./language";
import {Word, WordLink} from "./word";
import {Observable} from "rxjs/Observable";
import {of as observableOf} from 'rxjs/observable/of';
import {DictionaryResult} from "../dictionary.service";

export class Dictionary {
    readonly id: Number;
    readonly name: string;
    readonly from: Language;
    readonly to: Language;
    readonly wordMapFrom: Map<string, Word>;
    readonly wordMapTo: Map<string, Word>;
    readonly wordLinks: WordLink[];
    sort: string;
    asc: boolean;

    constructor(r: DictionaryResult) {
        this.id = r.id;
        this.name = r.name;
        this.from = r.languageFrom;
        this.to = r.languageTo;
        this.wordLinks = r.words;
        this.sort = 'id';
        this.asc = true;
        this.wordMapFrom = new Map();
        this.wordMapTo = new Map();
        for (const link of this.wordLinks) {
            for (const w of link.from) {
                this.wordMapFrom.set(w.text.toLocaleLowerCase(), w);
            }
            for (const w of link.to) {
                this.wordMapTo.set(w.text.toLocaleLowerCase(), w);
            }
        }
    }

    sortLinks(sort: string, asc: boolean): Observable<Dictionary> {
        if (this.sort == sort && this.asc == asc) {
            return observableOf(this);
        }
        else {
            this.sort = sort;
            this.asc = asc;
            let direction = asc ? 1 : -1;
            return new Observable<Dictionary>(observer => {
                    this.wordLinks.sort((a, b) => {
                        if (sort == 'id') {
                            return direction * ( a.id - b.id);
                        }
                        if (sort == 'original') {
                            let aText = "", bText = "";
                            a.from.forEach(o => aText += o.text + ',');
                            b.from.forEach(o => bText += o.text + ',');
                            return direction * ( aText.localeCompare(bText));
                        }
                        if (sort == 'translation') {
                            let aText = "", bText = "";
                            a.to.forEach(o => aText += o.text + ',');
                            b.to.forEach(o => bText += o.text + ',');
                            return direction * ( aText.localeCompare(bText));
                        }
                    });
                    observer.next(this);
                    observer.complete();
                }
            );
        }
    }

    addWord(link: WordLink) {
        this.wordLinks.push(link);
    }

    deleteWord(link: WordLink) {
        const index: number = this.wordLinks.indexOf(link);
        if (index !== -1) {
            this.wordLinks.splice(index, 1);
        }
    }
}