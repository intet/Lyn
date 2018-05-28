import {Injectable} from "@angular/core";
import {SyncApiService} from "./send/api.sync.service";
import {DictionaryService} from "./dictionary.service";
import {Observable} from "rxjs/Observable";
import {Test} from "./entity/test";
import {map} from "rxjs/operators";
import {Dictionary} from "./entity/dictionary";
import {TestParam, TestWordAttempt} from "./entity/test-param";
import {of as observableOf} from 'rxjs/observable/of';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    test: Test;
    constructor(private sendService: SyncApiService, private dictionaryService: DictionaryService) {
    }

    public getTest(): Observable<Test> {
        return observableOf(this.test);
    }

    public createTest(params: TestParam): Observable<Test> {
        return this.dictionaryService.getDictionary().pipe(
            map<Dictionary, Test>((dictionary:Dictionary)=>{
                this.test = new Test(dictionary.wordLinks, params);
                return this.test;
            })
        )
    }

    testWord(attempt: TestWordAttempt, input: string) {
        let valid = this.isValid(attempt, input);
        this.sendService.addWordAttempt(attempt.word, valid);
        return valid;
    }

    moveNext() {
        this.test.moveNext();
    }

    private isValid(attempt: TestWordAttempt, input: string) {
        const text = input.trim().toLocaleLowerCase();
        const words = attempt.from ? attempt.link.to : attempt.link.from;
        for (let word of words) {
            if (text == word.text.toLocaleLowerCase().trim()) {
                return true;
            }
        }
        return false;
    }
}