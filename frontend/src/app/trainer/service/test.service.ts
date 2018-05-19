import {Injectable} from "@angular/core";
import {SyncApiService} from "./send/api.sync.service";
import {DictionaryService} from "./dictionary.service";
import {Observable} from "rxjs/Observable";
import {Test, TestParam} from "./entity/test";
import {map, switchMap} from "rxjs/operators";
import {Dictionary} from "./entity/dictionary";

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(private sendService: SyncApiService, private dictionaryService: DictionaryService) {
        /* this.dictionary = new Dictionary(1, 'test');
         this.addSimpleWordLink("world", "мир");
         this.addSimpleWordLink("tree", "дерево");
         this.addWordLink(["key"], ["источник", "ключ"]);*/
    }


    public getTest(params:TestParam):Observable<Test>{
        return this.dictionaryService.getDictionary().pipe(
            map<Dictionary, Test>((dictionary:Dictionary)=>{
                return new Test(dictionary.wordLinks, params);
            })
        )
    }
}