import {Word} from "../entity/word";

export class LinkRequest {
    constructor(public  mode: Mode,
                public id: Number,
                public transportId: Number,
                public dictionary: Number,
                public from: Word[],
                public to: Word[]) {
    };

}

export class AttemptRequest {
    public id: number;
    public transportId: number;
    public successCount: number = 0;
    public errorCount: number = 0;
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