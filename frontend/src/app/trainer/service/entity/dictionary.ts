import {Language} from "./language";
import {Word, WordLink} from "./word";
import {Observable} from "rxjs/Observable";
import {of as observableOf} from 'rxjs/observable/of';

export class Dictionary {
    readonly id: Number;
    readonly name: String;
    readonly from: Language;
    readonly to: Language;
    readonly wordMap: Map<string, Word>;
    readonly wordLinks: WordLink[];
    sort: String;
    asc: boolean;
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.wordMap = new Map();
        this.wordLinks = [];
        this.sort = 'id';
        this.asc = true;
    }

    sortLinks(sort: String, asc: boolean): Observable<Dictionary> {
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
}