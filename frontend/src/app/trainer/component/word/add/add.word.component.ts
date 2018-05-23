import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {WordService} from "../../../service/word.service";

@Component({
    selector: 'add-word',
    templateUrl: './add.word.component.html',
    styleUrls: ['./add.word.component.css']
})
export class WordAddComponent implements OnInit {
    link: RowLink;

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

    addFrom() {
        this.afterChange(this.link.from);
    }

    addTo() {
        this.afterChange(this.link.to);
    }

    private afterChange(arr: Row[]) {
        if (arr[arr.length - 1].text !== '')
            arr.push(new Row(''));
    }
}

export class RowLink {
    from: Row[];
    to: Row[];

    constructor() {
        this.from = [new Row('')];
        this.to = [new Row('')];
    }
}

export class Row {
    text: string = '';

    constructor(text?: string) {
        this.text = text;
    }
}