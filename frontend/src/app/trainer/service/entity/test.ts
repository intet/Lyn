import {Dictionary} from "./dictionary";
import {Word, WordLink} from "./word";
import {shuffle} from "../../../shared/utilities/collections.util";

export class Test {


    readonly dictionary:Dictionary;
    readonly params:TestParam;
    //Содержит слова в порядке тестирования. Слова повторяются testCount раз.
    //В случае ошибок добавляется в конец новые слова так чтобы подряд человек набил lineSuccessCount раз
    public words:TestWordAttempt[];
    public wordsStatus:Map<string, TestWordStatus> = new Map();
    constructor(wordLinks: WordLink[], params: TestParam) {
        this.params = params;
        this.words = [];
        let counter = params.testCount;
        this.words = this.initAttempts(counter, wordLinks, params.type);
    }

    private initAttempts(counter, wordLinks: WordLink[], type: TestType) {
        const array = [];
        while (counter > 0) {
            for (let link of wordLinks) {
                if (type == TestType.FROM || type == TestType.BOTH) {
                    for (let word of link.from) {
                        array.push(new TestWordAttempt(word, true, link));
                    }
                }
                if (type == TestType.TO || type == TestType.BOTH) {
                    for (let word of link.to) {
                        array.push(new TestWordAttempt(word, false, link));
                    }
                }
            }
        }
        shuffle(array);
        return array;
    }
}

export class TestParam {
    lineSuccessCount: number=2;
    testCount:number=2;
    wordCount:number;
    type:TestType=TestType.FROM;
    //TODO подумать над тем что проверять буду слова в обе стороны
}

export class TestWordStatus {
    countAttempts:number;
    countSuccess:number;
    countFail:number;
    countLineSuccess:number;
}
export enum TestType {
    FROM, TO, BOTH
}
export class TestWordAttempt {
    text:Word;
    from:boolean;
    link:WordLink;
    constructor(text: Word, from: boolean, link: WordLink) {
        this.text = text;
        this.from = from;
        this.link = link;
    }
}