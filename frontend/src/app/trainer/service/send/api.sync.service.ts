import {Injectable} from "@angular/core";
import {AttemptRequest, EditResult, EntityRequest, LinkRequest, Mode, ResponseEditWrapper} from "./entity";
import {Word, WordLink} from "../entity/word";
import {timer} from "rxjs/index";
import {ApiService} from "../../../security/service/api.service";
import {Dictionary} from "../entity/dictionary";

@Injectable({
    providedIn: 'root',
})
export class SyncApiService {
    private timer;
    private static transportId: number = -1;

    constructor(private api: ApiService) {
        this.timer = timer(10000, 10000);
        this.timer.subscribe((t) => this.onTime())
    }

    public sync: number = 0;
    public static generateTransportId(): number {
        SyncApiService.transportId -= 1;
        return SyncApiService.transportId;
    }

    private requests = new Map<string, Map<any, ItemForSend<any, any>>>();

    addLink(dictionary: Dictionary, link: WordLink) {
        link.from.forEach(l => l.language = dictionary.from.id);
        link.to.forEach(l => l.language = dictionary.to.id);

        this.addRequest('/saveLinks', link.transportId, link, dictionary,
            ((link: WordLink, dictionary: Dictionary) => {
                return new LinkRequest(Mode.ADD, link.id, link.transportId, dictionary.id, link.from, link.to)
            }),
            ((item: ItemForSend<WordLink, Dictionary>, link: WordLink) => {
                item.object = link;
            }),
            ((response: EditResult<any>, link: WordLink) => {
                link.id = response.id;
                link.from.filter((w: Word) => {
                    const result = response.subResult[w.transportId];
                    return result != null && result.success
                }).forEach((w: Word) => w.id = response.subResult[w.transportId].id);

                link.to.filter((w: Word) => {
                    const result = response.subResult[w.transportId];
                    return result != null && result.success
                }).forEach((w: Word) => w.id = response.subResult[w.transportId].id);
            })
        );
    }

    addWordAttempt(word: Word, valid: boolean) {
        let attemptRequest = new AttemptRequest(null, SyncApiService.generateTransportId());
        if (valid) {
            attemptRequest.countSuccess += 1;
        }
        else {
            attemptRequest.countFail += 1;
        }

        this.addRequest('/syncAttempts', word, word, attemptRequest,
            ((word: Word, attemptRequest: AttemptRequest) => {
                if (word.id = null) {
                    return null;
                }
                else {
                    attemptRequest.id = word.id;
                    return attemptRequest;
                }
            }),
            ((item: ItemForSend<Word, AttemptRequest>, word: Word, param: AttemptRequest) => {
                item.param.countSuccess += param.countSuccess;
                item.param.countFail += param.countFail;
            }),
            ((response: EditResult<Word>, word: Word) => {
                word.update(response.info);
            })
        );
    }

    onTime() {
        if (this.sync > 0) return;
        this.requests.forEach((items: Map<any, ItemForSend<any, any>>, url: string) => {
            if (items.size == 0) return;
            const requests = [];
            const mapParam = new Map<number, ItemForSend<any, any>>();

            let keys = [];
            for (let entry of Array.from(items.entries())) {
                const key = entry[0];
                const item = entry[1];
                const r = item.requestFn(item.object, item.param);
                if (r == null)
                    continue;
                keys.push(key);
                requests.push(r);
                mapParam.set(r.transportId, item);
            }
            for (let key of keys) {
                mapParam.delete(key);
            }
            if (!this.checkAndStartSync(requests))
                return;
            this.api.post(ApiService.api_path + url, requests).subscribe(
                (t: ResponseEditWrapper<any>) => {
                    mapParam.forEach((item: ItemForSend<any, any>, id: number) => {
                        let response = t.rows[id];
                        if (response == null)
                            return;
                        if (response.success) {
                            item.callbackFn(response, item.object, item.param);
                        }
                    });
                    this.sync--;
                }
            );
        });
    }

    private checkAndStartSync(array: any[]) {
        if (array.length > 0) {
            this.sync += 1;
            return true;
        }
        else {
            return false;
        }
    }

    private addRequest<K, T, P>(url: string, key: K, object: T, param: P,
                                requestFn: (object: T, param: P) => EntityRequest,
                                mergeFn: (item: ItemForSend<T, P>, object: T, param: P) => void,
                                callbackFn: (r: EditResult<any>, object: T, param: P) => void,
                                errorFn?: (object: T, param: P) => void) {
        let map = this.requests.get(url);
        if (map == null) {
            map = new Map<K, ItemForSend<T, P>>();
            this.requests.set(url, map);
        }
        let item = map.get(key);
        if (item == null) {
            map.set(key, new ItemForSend<T, P>(object, param, requestFn, callbackFn, errorFn));
        }
        else {
            mergeFn(item, object, param);
        }
    }

}

class ItemForSend<T, P> {
    object: T;
    param: P;
    requestFn: (object: T, param: P) => EntityRequest;
    callbackFn: (r: EditResult<any>, object: T, param: P) => void;
    errorFn?: (object: T, param: P) => void;

    constructor(object: T, param: P, requestFn: (object: T, param: P) => EntityRequest, callbackFn: (r: EditResult<any>, object: T, param: P) => void, errorFn: (object: T, param: P) => void) {
        this.object = object;
        this.param = param;
        this.requestFn = requestFn;
        this.callbackFn = callbackFn;
        this.errorFn = errorFn;
    }
}
