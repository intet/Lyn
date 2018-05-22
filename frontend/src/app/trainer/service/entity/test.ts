import {Dictionary} from "./dictionary";
import {Word, WordLink} from "./word";
import {shuffle} from "../../../shared/utilities/collections.util";
import {TestParam, TestType, TestWordAttempt, TestWordStatus} from "./test-param";

export class Test {


    readonly dictionary: Dictionary;
    readonly params: TestParam;
    //Содержит слова в порядке тестирования. Слова повторяются testCount раз.
    //В случае ошибок добавляется в конец новые слова так чтобы подряд человек набил lineSuccessCount раз
    public words: TestWordAttempt[];
    public wordsStatus: Map<Word, TestWordStatus>;
    public index: number;

    constructor(wordLinks: WordLink[], params: TestParam) {
        this.params = params;
        this.wordsStatus = new Map();
        this.index = 0;
        this.words = this.initAttempts(params.testCount, wordLinks, params.type, this.wordsStatus);
    }


    getCurrentWord(): TestWordAttempt {
        return this.words[this.index];
    }

    moveNext() {
        if (this.index < this.words.length - 1) {
            this.index++;
            return true;
        }
        else {
            return false;
        }
    }

    private initAttempts(testCount: number, wordLinks: WordLink[], type: TestType, map: Map<Word, TestWordStatus>) {
        const array = [];
        for (let counter = 0; counter < testCount; counter++) {
            for (let link of wordLinks) {
                if (type == TestType.FROM || type == TestType.BOTH) {
                    for (let word of link.from) {
                        if (counter == 0) {
                            map.set(word, new TestWordStatus());
                        }
                        array.push(new TestWordAttempt(word, true, link));
                    }
                }
                if (type == TestType.TO || type == TestType.BOTH) {
                    for (let word of link.to) {
                        if (counter == 0) {
                            map.set(word, new TestWordStatus());
                        }
                        array.push(new TestWordAttempt(word, false, link));
                    }
                }
            }
        }
        shuffle(array);
        return array;
    }
}

