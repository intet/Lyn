import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'list-word',
    templateUrl: './list.word.component.html',
    styleUrls: ['./list.word.component.css']
})
export class ListWordComponent implements OnInit {
    @Input()
    words: Row[];

    constructor() {
    }

    ngOnInit() {

    }

    public afterChange() {
        if (this.words[this.words.length - 1].text !== '')
            this.words.push(new Row(''));
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