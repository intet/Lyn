import {Component, OnInit} from "@angular/core";
import {WordService} from "../../../service/word.service";

@Component({
    selector: 'add-word',
    templateUrl: './add.word.component.html',
    styleUrls: ['./add.word.component.css']
})
export class WordAddComponent implements OnInit {
    from: Row[];
    to: Row[];

    constructor(private wordService: WordService) {
        this.from = [new Row('')];
        this.to = [new Row('')];
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