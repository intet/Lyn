import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {WordService} from "../../../service/word.service";

@Component({
    selector: 'test-container',
    templateUrl: './test.container.component.html',
    styleUrls: ['./test.container.component.css']
})
export class TestContainerComponent implements OnInit {
    constructor(public dialog: MatDialog, private wordService: WordService) {
    }
    ngOnInit() {

    }

    openDialog(): void {
        let form = this;
      /*  let dialogRef = this.dialog.open(WordAddComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                form.wordService.createLink(result as RowLink);
            }
        });*/
    }
}

