import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {WordService} from "../../../service/word.service";
import {ListWordComponent, Row, RowLink, WordListMode} from "./list/list.word.component";
import {TranslateResult} from "../../../service/send/entity";
import {WordLink} from "../../../service/entity/word";

@Component({
    selector: 'add-word',
    templateUrl: './add.word.component.html',
    styleUrls: ['./add.word.component.css']
})
export class WordAddComponent implements OnInit {
    public link: RowLink;
    private wordLink: WordLink;
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
            this.mode = WordListMode.SELECT;
            this.initSelect(data.from);
        }
        else if (data && data.link) {
            this.mode = WordListMode.EDIT;
            this.initEdit(data.link);

        }
        else {
            this.mode = WordListMode.NORMAL;

        }
    }

    private initSelect(from: string) {
        this.link.from[0].text = from;
        this.wordService.translate(from).subscribe((result: TranslateResult) => {
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
    }

    private initEdit(wordLink: WordLink) {
        this.link.from = [];
        this.link.to = [];
        for (let word of wordLink.from) {
            let row = new Row(word.text);
            this.link.from.push(row);
        }
        for (let word of wordLink.to) {
            let row = new Row(word.text);
            this.link.to.push(row);
        }
        this.wordLink = wordLink;
    }

    ngOnInit() {

    }

    save() {
        if (this.wordLink == null) {
            this.wordService.createLink(this.link);
        }
        else {
            this.wordService.updateLink(this.wordLink, this.link);
        }
        this.dialogRef.close(this.link);
    }

    delete() {
        this.wordService.deleteWordLink(this.wordLink);
    }

    isEditMode() {
        return this.mode == WordListMode.EDIT;
    }

    isShowYandex() {
        return this.mode == WordListMode.SELECT;
    }
}
