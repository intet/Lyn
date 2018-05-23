import {Component, OnInit} from "@angular/core";
import {getSelectedWord} from "../../../../shared/utilities/view.util";
import {MatDialog} from "@angular/material";
import {RowLink, WordAddComponent} from "../../word/add/add.word.component";
import {WordService} from "../../../service/word.service";

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
        let dialogRef = this.dialog.open(WordAddComponent, {data: {from: str}});
        dialogRef.afterClosed().subscribe((result: RowLink) => {
            if (result) {
                this.wordService.createLink(result);
            }
        });
    }
}

