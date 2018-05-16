import {Injectable} from "@angular/core";
import {LinkRequest, Mode} from "./entity";
import {WordLink} from "../entity/word";
import {timer} from "rxjs/index";
import {ApiService} from "../../../security/service/api.service";
import {Dictionary} from "../entity/dictionary";

@Injectable({
    providedIn: 'root',
})
export class SyncApiService {
    private links: Map<Number, LinkRequest> = new Map();
    private timer;

    constructor(private api: ApiService) {
        this.timer = timer(10000, 10000);
        this.timer.subscribe((t) => this.onTime())
    }

    addLink(dictionary: Dictionary, link: WordLink) {
        link.from.forEach(l => l.language = dictionary.from.id);
        link.to.forEach(l => l.language = dictionary.to.id);
        let linkRequest = new LinkRequest(Mode.ADD, link.id, link.internalId, dictionary.id, link.from, link.to);
        this.links.set(link.internalId, linkRequest);
    }

    onTime() {
        if (this.links.size == 0) return;
        this.api.post(ApiService.api_path + '/saveLinks', Array.from(this.links.values())).subscribe(
            (t) => console.log("!!send !!")
        );
    }
}

