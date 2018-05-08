import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Word} from "./word";
import {ResponsePagingWrapper} from "../../util/entity";
import {of as observableOf} from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private words: Word[] = [new Word('1', "world", "мир"), new Word('2', "street", "улица")];

  constructor() {
  }

  getWords(sort: string, order: string, page: number, pageSize: number): Observable<ResponsePagingWrapper<Word>> {

    let result = new ResponsePagingWrapper(this.words.length, this.words);
    return observableOf(result);
  }
}
