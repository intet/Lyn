import {Component, OnInit} from "@angular/core";
import {TestWordAttempt} from "../../../service/entity/test-param";
import {TestService} from "../../../service/test.service";
import {Test} from "../../../service/entity/test";

@Component({
    selector: 'step-word',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.css']
})
export class WordStepComponent implements OnInit {
    attempt: TestWordAttempt;
    input: String;
    invalid: boolean;

    constructor(private testService: TestService) {
    }

    ngOnInit() {
        this.updateWord();
    }


    onEnter(e: any) {
        if (e.keyCode != 13) return;
        e.preventDefault();
        if (this.testService.testWord(this.attempt, this.input)) {
            this.updateWord();
            this.input = '';
            this.invalid = false;
            this.testService.moveNext();
        }
        else {
            this.input = '';
            this.invalid = true;
            this.swing();
        }
    }

    private updateWord() {
        this.testService.getTest().subscribe((t: Test) => {
            this.attempt = t.getCurrentWord()
        });
    }
    swing() {
        setTimeout(() => {
            this.invalid = false;
        }, 1000);
    }
}
