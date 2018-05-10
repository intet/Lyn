export class WordLink {
    id: Number;
    from: Word[];
    to: Word[];

    constructor(form: Word[], to: Word[]) {
        this.id = null;
        this.from = form;
        this.to = to;
    }
}

export class Word {
    id: Number;
    text: String;
    created: Date;
    private _lastAttempt: Date;
    private _lastSuccess: Date;

    constructor(text: String) {
        this.id = null;
        this.text = text;
        this.created = new Date();
    }

    private _countAttempts: number = 0;

    get countAttempts(): number {
        return this._countAttempts;
    }

    private _countSuccess: number = 0;

    get countSuccess(): number {
        return this._countSuccess;
    }

    private _countFail: number = 0;

    get countFail(): number {
        return this._countFail;
    }

    private _lineSuccess: number = 0;

    get lineSuccess(): number {
        return this._lineSuccess;
    }

    attempt(success: boolean) {
        this._countAttempts++;
        this._lastAttempt = new Date();
        if (success) {
            this._lineSuccess++;
            this._countSuccess++;
            this._lastSuccess = new Date();
        }
        else {
            this._lineSuccess = 0;
            this._countFail++;
        }
    }
}
