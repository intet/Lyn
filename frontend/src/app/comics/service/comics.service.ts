import {Injectable} from "@angular/core";
import {ApiService} from "../../security/service/api.service";

@Injectable({
    providedIn: 'root',
})
export class ComicsService {
    static api_path = '/api/comics';

    constructor(private api: ApiService) {
    }

    updateUrls() {
        this.api.post(ComicsService.api_path + '/updateUrls', {}).subscribe();
    }

    updatePageUrls() {
        this.api.post(ComicsService.api_path + '/updatePageUrls', {}).subscribe();
    }

}
