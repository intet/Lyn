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
        this.from = [new Row('test'), new Row('test2')];
        this.to = [new Row('test4')];
    }

    ngOnInit() {

    }

    addFrom() {
        this.from.push();
    }

    addTo() {
        this.to.push();
    }
}

class Row {
    text: string = '';

    constructor(text?: string) {
        this.text = text;
    }
}