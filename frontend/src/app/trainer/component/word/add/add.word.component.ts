import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'add-word',
    templateUrl: './add.word.component.html',
    styleUrls: ['./add.word.component.css']
})
export class WordAddComponent implements OnInit {
    link: RowLink;

    constructor(public dialogRef: MatDialogRef<WordAddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.link = new RowLink();
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