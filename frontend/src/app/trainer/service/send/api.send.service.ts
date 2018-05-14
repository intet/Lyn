import {Injectable} from "@angular/core";
import {LinkRequest, Mode} from "./entity";
import {WordLink} from "../entity/word";
import {timer} from "rxjs/index";
import {ApiService} from "../../../security/service/api.service";

@Injectable({
    providedIn: 'root',
})
export class SendApiService {
    private links: Map<Number, LinkRequest> = new Map();
    private timer;
    private api_path = '/api/trainer';

    constructor(private api: ApiService) {
        this.timer = timer(10000, 10000);
        this.timer.subscribe((t) => this.onTime())
    }

    addLink(dictionary: Number, link: WordLink) {
        let linkRequest = new LinkRequest(Mode.ADD, link.id, dictionary, link.from, link.to);
        this.links.set(link.internalId, linkRequest);
    }

    onTime() {
        if (this.links.size == 0) return;
        this.api.post(this.api_path + '/saveLinks', Array.from(this.links.values())).subscribe(
            (t) => console.log("!!send !!")
        );
    }
}

