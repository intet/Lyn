import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {WordService} from "../../../service/word.service";
import {ListWordComponent, Row, RowLink} from "./list/list.word.component";

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

    constructor(public dialogRef: MatDialogRef<WordAddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private wordService: WordService) {
        this.link = new RowLink();
        if (data && data.from) {
            this.link.from[0].text = data.from;
            this.wordService.translate(data.from).subscribe((to: string[]) => {
                if (!to || to.length == 0)
                    return;
                this.link.to = [];
                for (let word of to) {
                    this.link.to.push(new Row(word));
                }
            });
        }
    }

    ngOnInit() {

    }

    save() {
        this.wordService.createLink(this.link);
        this.dialogRef.close(this.link);
    }
}
