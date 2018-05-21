import {Injectable} from "@angular/core";
import {SyncApiService} from "./send/api.sync.service";
import {DictionaryService} from "./dictionary.service";
import {Observable} from "rxjs/Observable";
import {Test} from "./entity/test";
import {map} from "rxjs/operators";
import {Dictionary} from "./entity/dictionary";
import {TestParam} from "./entity/test-param";
import {of as observableOf} from 'rxjs/observable/of';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    test: Test;
    constructor(private sendService: SyncApiService, private dictionaryService: DictionaryService) {
        /* this.dictionary = new Dictionary(1, 'test');
         this.addSimpleWordLink("world", "мир");
         this.addSimpleWordLink("tree", "дерево");
         this.addWordLink(["key"], ["источник", "ключ"]);*/
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

}