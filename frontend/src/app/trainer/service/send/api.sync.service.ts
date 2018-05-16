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
    private links: Map<number, WordLink> = new Map();
    private linkRequests: Map<number, LinkRequest> = new Map();
    private timer;

    constructor(private api: ApiService) {
        this.timer = timer(10000, 10000);
        this.timer.subscribe((t) => this.onTime())
    }

    addLink(dictionary: Dictionary, link: WordLink) {
        link.from.forEach(l => l.language = dictionary.from.id);
        link.to.forEach(l => l.language = dictionary.to.id);
        let linkRequest = new LinkRequest(Mode.ADD, link.id, link.internalId, dictionary.id, link.from, link.to);
        this.links.set(link.internalId, link);
        this.linkRequests.set(link.internalId, linkRequest);
    }

    onTime() {
        if (this.links.size == 0) return;
        this.api.post(ApiService.api_path + '/saveLinks', Array.from(this.links.values())).subscribe(
            (t: ResponseEditWrapper) => {
                let ids: number[] = [];
                this.links.forEach((link: WordLink, id: number) => {
                    let response = t.rows[id];
                    link.id = response.id;
                    if (response.success) {
                        ids.push(id);
                    }
                    /*  response.subResult.forEach((r:EditResult)=>{
                          link.from.filter((w:Word)=>w.transportId = r.id)
                              .forEach((w:Word)=> w.id = r.id);
                          link.to.filter((w:Word)=>w.transportId = r.id)
                              .forEach((w:Word)=> w.id = r.id);
                      });*/
                });
                /*ids.forEach(id=>{
                    this.linkRequests.delete(id);
                    this.links.delete(id);
                });*/

            }
        );
    }
}

interface ResponseEditWrapper {
    rows: EditResult[];
}

interface EditResult {
    id: number;
    success: boolean;
    error: string;
    subResult: EditResult[];
}