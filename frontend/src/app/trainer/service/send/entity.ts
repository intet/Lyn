import {Word} from "../entity/word";

export class ObjectRequest {
    constructor(public id: number,
                public transportId: number) {
    }

}

export class LinkRequest extends ObjectRequest {
    constructor(public  mode: Mode,
                public id: number,
                public transportId: number,
                public dictionary: Number,
                public from: Word[],
                public to: Word[]) {
        super(id, transportId);
    };

}

export class AttemptRequest extends ObjectRequest {
    public successCount: number = 0;
    public errorCount: number = 0;

    constructor(id: number, transportId: number) {
        super(id, transportId);
    }
}

export interface ResponseEditWrapper {
    rows: EditResult[];
}

export interface EditResult {
    id: number;
    success: boolean;
    error: string;
    subResult: EditResult[];
}

export enum Mode {
    ADD, EDIT, REMOVE
}