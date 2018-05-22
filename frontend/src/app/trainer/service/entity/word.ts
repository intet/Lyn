import {SyncApiService} from "../send/api.sync.service";

export class WordLink {
    id: number;
    from: Word[];
    to: Word[];
    transportId: number;

    constructor(form: Word[], to: Word[]) {
        this.id = null;
        this.from = form;
        this.to = to;
        this.transportId = SyncApiService.generateTransportId();
    }
}

export class Word {
    id: number;
    transportId: number;
    text: String;
    created: Date;
    language: number;
    private _lastAttempt: Date;
    private _lastSuccess: Date;

    constructor(text: String) {
        this.id = null;
        this.text = text;
        this.created = new Date();
        this.transportId = SyncApiService.generateTransportId();
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

    update(w: Word) {
        this._countSuccess = w.countSuccess;
        this._countFail = w.countFail;
        this._countAttempts = w.countAttempts;
    }
}
