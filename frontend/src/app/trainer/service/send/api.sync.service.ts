import {Injectable} from "@angular/core";
import {AttemptRequest, LinkRequest, Mode, ResponseEditWrapper} from "./entity";
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
    private links: Map<number, WordLink> = new Map();
    private linkRequests: Map<number, LinkRequest> = new Map();
    private attempts: Map<Word, AttemptRequest> = new Map();
    private attemptRequests: Map<number, AttemptRequest> = new Map();

    public static generateTransportId(): number {
        SyncApiService.transportId -= 1;
        return SyncApiService.transportId;
    }

    addLink(dictionary: Dictionary, link: WordLink) {
        link.from.forEach(l => l.language = dictionary.from.id);
        link.to.forEach(l => l.language = dictionary.to.id);
        let linkRequest = new LinkRequest(Mode.ADD, link.id, link.transportId, dictionary.id, link.from, link.to);
        this.links.set(link.transportId, link);
        this.linkRequests.set(link.transportId, linkRequest);
    }

    addWordAttempt(word: Word, valid: boolean) {
        let attemptRequest = this.attempts.get(word);
        if (attemptRequest == null) {
            attemptRequest = new AttemptRequest();
            this.attempts.set(word, attemptRequest);
        }
        if (valid) {
            attemptRequest.successCount += 1;
        }
        else {
            attemptRequest.errorCount += 1;
        }
    }

    onTime() {
        if (this.sync > 0) return;
        this.syncWords();
        this.syncAttempts();
    }

    private checkAndStartSync(array: Map<any, any>) {
        if (array.size > 0) {
            this.sync += 1;
            return true;
        }
        else {
            return false;
        }
    }

    private syncWords() {
        if (!this.checkAndStartSync(this.links))
            return;

        this.api.post(ApiService.api_path + '/saveLinks', Array.from(this.linkRequests.values())).subscribe(
            (t: ResponseEditWrapper) => {
                let ids: number[] = [];
                this.links.forEach((link: WordLink, id: number) => {
                    let response = t.rows[id];
                    if (response == null)
                        return;
                    link.id = response.id;
                    if (response.success) {
                        ids.push(id);
                    }
                    link.from.filter((w: Word) => {
                        const result = response.subResult[w.transportId];
                        return result != null && result.success
                    })
                        .forEach((w: Word) => w.id = response.subResult[w.transportId].id);
                    link.to.filter((w: Word) => {
                        const result = response.subResult[w.transportId];
                        return result != null && result.success
                    })
                        .forEach((w: Word) => w.id = response.subResult[w.transportId].id);

                });
                ids.forEach(id => {
                    this.linkRequests.delete(id);
                    this.links.delete(id);
                });
                this.sync -= 1;
            }
        );
    }

    private syncAttempts() {


        const items = Array.from(this.attempts.entries()).filter((arr: [Word, AttemptRequest]) => {
            return arr[0].id != null
        });
        for (let arr of items) {
            this.attempts.delete(arr[0]);
            const attempt = arr[1];
            attempt.transportId = SyncApiService.generateTransportId();
            this.attemptRequests.set(attempt.transportId, attempt);
        }

        if (!this.checkAndStartSync(this.attemptRequests))
            return;

        this.api.post(ApiService.api_path + '/syncAttempts', Array.from(this.attemptRequests.values())).subscribe(
            (t: ResponseEditWrapper) => {
                let ids: number[] = [];
                this.attemptRequests.forEach((attempt: AttemptRequest, id: number) => {
                    let response = t.rows[id];
                    if (response == null)
                        return;
                    if (response.success) {
                        ids.push(id);
                    }

                });
                ids.forEach(id => {
                    this.attemptRequests.delete(id);
                });
                this.sync -= 1;
            }
        );
    }
}

