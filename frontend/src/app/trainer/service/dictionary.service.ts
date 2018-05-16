import {Injectable} from "@angular/core";
import {of as observableOf} from 'rxjs/observable/of';
import {Dictionary} from "./entity/dictionary";
import {Subject} from "rxjs/Subject";
import {ApiService} from "../../security/service/api.service";
import {Observable} from "rxjs/Observable";

@Injectable({
    providedIn: 'root',
})
export class DictionaryService {
    public dictionaryChange = new Subject();
    private dictionary: Dictionary;

    constructor(private api: ApiService) {

    }

    loadDefault(): Observable<Dictionary> {
        return this.api.get(ApiService.api_path + '/getDefaultDictionary')
            .map<any, Dictionary>((result) => {
                this.dictionary = new Dictionary(result.id, result.name, result.languageFrom, result.languageTo);
                return this.dictionary;
            });
    }

    public getDictionary(): Observable<Dictionary> {
        if (this.dictionary != null) {
            return observableOf(this.dictionary);
        }
        else {
            return this.loadDefault();
        }
    }

}
