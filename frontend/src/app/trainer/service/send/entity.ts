import {Word} from "../entity/word";

export class EntityRequest {
    constructor(public id: number,
                public transportId: number) {
    }

}

export class LinkRequest extends EntityRequest {
    constructor(public  mode: Mode,
                public id: number,
                public transportId: number,
                public dictionary: Number,
                public from: Word[],
                public to: Word[]) {
        super(id, transportId);
    };

}

export class AttemptRequest extends EntityRequest {
    public countSuccess: number = 0;
    public countFail: number = 0;

    constructor(id: number, transportId: number) {
        super(id, transportId);
    }
}

export interface ResponseEditWrapper<P> {
    rows: EditResult<P>[];
}

export interface EditResult<P> {
    id: number;
    success: boolean;
    error: string;
    subResult: EditResult<P>[];
    info: P
}

export enum Mode {
    ADD, EDIT, REMOVE
}