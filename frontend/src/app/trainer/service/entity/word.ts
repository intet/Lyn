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
    lastAttempt: Date;
    lastSuccess: Date;
    countAttempts: number = 0;
    countSuccess: number = 0;
    countFail: number = 0;

    constructor(text: String) {
        this.id = null;
        this.text = text;
        this.created = new Date();
        this.transportId = SyncApiService.generateTransportId();
    }

    static update(w1: Word, w2: Word) {
        w1.countAttempts = w2.countAttempts;
        w1.countFail = w2.countFail;
        w1.countSuccess = w2.countSuccess;
    }
}
