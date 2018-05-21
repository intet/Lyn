import {Word, WordLink} from "./word";

export class TestParam {
    lineSuccessCount: number = 2;
    testCount: number = 2;
    wordCount: number;
    type: TestType = TestType.FROM;
}

export class TestWordStatus {
    countAttempts: number;
    countSuccess: number;
    countFail: number;
    countLineSuccess: number;
}

export enum TestType {
    FROM, TO, BOTH
}

export class TestWordAttempt {
    word: Word;
    from: boolean;
    link: WordLink;

    constructor(word: Word, from: boolean, link: WordLink) {
        this.word = word;
        this.from = from;
        this.link = link;
    }
}