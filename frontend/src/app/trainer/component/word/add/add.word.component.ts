import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {WordService} from "../../../service/word.service";
import {ListWordComponent, Row, RowLink, WordListMode} from "./list/list.word.component";
import {TranslateResult} from "../../../service/send/entity";

@Component({
    selector: 'add-word',
    templateUrl: './add.word.component.html',
    styleUrls: ['./add.word.component.css']
})
export class WordAddComponent implements OnInit {
    public link: RowLink;
    @ViewChild('fromComponent')
    public fromComponent: ListWordComponent;
    @ViewChild('toComponent')
    public toComponent: ListWordComponent;
    public mode: WordListMode;
    constructor(public dialogRef: MatDialogRef<WordAddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private wordService: WordService) {
        this.link = new RowLink();
        if (data && data.from) {
            this.link.from[0].text = data.from;
            this.wordService.translate(data.from).subscribe((result: TranslateResult) => {
                if (!result || result.noun.length == 0)
                    return;
                this.link.to = [];
                let first = true;
                for (let word of result.noun) {
                    let row = new Row(word);
                    if (first) {
                        first = false;
                    } else {
                        row.selected = false;
                    }
                    this.link.to.push(row);
                }
            });
            this.mode = WordListMode.SELECT;
        }
        else {
            this.mode = WordListMode.NORMAL;
        }
    }

    ngOnInit() {

    }

    save() {
        this.wordService.createLink(this.link);
        this.dialogRef.close(this.link);
    }

    isShowYandex() {
        return this.mode == WordListMode.SELECT;
    }
}
