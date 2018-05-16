export class Language {
    readonly id: number;
    readonly code: String;
    readonly name: String;

    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}
