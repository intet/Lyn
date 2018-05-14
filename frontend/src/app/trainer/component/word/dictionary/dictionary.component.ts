import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {RowLink, WordAddComponent} from "../add/add.word.component";
import {WordService} from "../../../service/word.service";

@Component({
    selector: 'dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
    constructor(public dialog: MatDialog, private wordService: WordService) {
    }

    ngOnInit() {

    }

    openDialog(): void {
        let form = this;
        let dialogRef = this.dialog.open(WordAddComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                form.wordService.createLink(result as RowLink);
            }
        });
    }
}

