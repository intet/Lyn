import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {RowLink, WordAddComponent} from "../add/add.word.component";
import {WordService} from "../../../service/word.service";
import {NewTestComponent} from "../../test/new-test/new-test.component";
import {Router} from "@angular/router";

@Component({
    selector: 'dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
    constructor(public dialog: MatDialog, private wordService: WordService, private router:Router) {
    }

    ngOnInit() {

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(WordAddComponent);
        dialogRef.afterClosed().subscribe((result:RowLink) => {
            if (result) {
                this.wordService.createLink(result);
            }
        });
    }
    newTest(): void {
        let dialogRef = this.dialog.open(NewTestComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.router.navigate(['/test']);
            }
        });
    }
}

