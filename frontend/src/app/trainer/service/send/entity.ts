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

export enum Mode {
    ADD, EDIT, REMOVE
}