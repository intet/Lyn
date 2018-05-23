import {Component, OnInit} from "@angular/core";
import {getSelectedWord} from "../../../../shared/utilities/view.util";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {WordAddComponent} from "../../word/add/add.word.component";
import {WordService} from "../../../service/word.service";
import {RowLink} from "../../word/add/list/list.word.component";

@Component({
    selector: 'test-container',
    templateUrl: './reader.input.component.html',
    styleUrls: ['./reader.input.component.css']
})
export class ReaderInputComponent implements OnInit {
    public isLoading: boolean = false;
    public text: string;

    constructor(private dialog: MatDialog, private wordService: WordService) {
    }

    ngOnInit() {

    }

    onSelect() {
        let str = getSelectedWord();
        let config = new MatDialogConfig();
        config.data = {from: str};
        let dialogRef = this.dialog.open(WordAddComponent, config);
        dialogRef.afterClosed().subscribe((result: RowLink) => {

        });
    }
}

