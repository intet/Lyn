import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {WordAddComponent} from "../add/add.word.component";

@Component({
    selector: 'dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(WordAddComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
}

