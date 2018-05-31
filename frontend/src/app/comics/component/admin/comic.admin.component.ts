import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ComicsService} from "../../service/comics.service";

@Component({
    selector: 'comic-admin',
    templateUrl: './comic.admin.component.html',
    styleUrls: ['./comic.admin.component.css']
})
export class ComicAdminComponent implements OnInit {
    constructor(private comicsService: ComicsService,
                route: ActivatedRoute) {
    }

    ngOnInit() {

    }

    updateUrls() {
        this.comicsService.updateUrls();
    }

    updatePageUrls() {
        this.comicsService.updatePageUrls();
    }
}

