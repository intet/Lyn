import {Language} from "./language";
import {Word, WordLink} from "./word";

export class Dictionary {
    readonly id: Number;
    readonly name: String;
    readonly from: Language;
    readonly to: Language;
    readonly wordMap: Map<string, Word>;
    readonly wordLinks: WordLink[];

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.wordMap = new Map();
        this.wordLinks = [];
    }
}
