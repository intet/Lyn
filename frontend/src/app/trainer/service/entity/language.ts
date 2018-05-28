export class Language {
    readonly id: number;
    readonly code: string;
    readonly name: string;

    constructor(id, code, name) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}
