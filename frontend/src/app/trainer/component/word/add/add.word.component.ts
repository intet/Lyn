import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'add-word',
    templateUrl: './add.word.component.html',
    styleUrls: ['./add.word.component.css']
})
export class WordAddComponent implements OnInit {
    from: Row[];
    to: Row[];

    constructor(public dialogRef: MatDialogRef<WordAddComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.from = [new Row('')];
        this.to = [new Row('')];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onLaunchClick(): void {
        let params: any = {};
    }

    ngOnInit() {

    }

    addFrom() {
        this.afterChange(this.from);
    }

    addTo() {
        this.afterChange(this.to);
    }

    private afterChange(arr: Row[]) {
        if (arr[arr.length - 1].text !== '')
            arr.push(new Row(''));
    }
}

class Row {
    text: string = '';

    constructor(text?: string) {
        this.text = text;
    }
}