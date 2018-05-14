import {Component, OnInit} from "@angular/core";
import {Word, WordLink} from "../../service/entity/word";

@Component({
  selector: 'step-word',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class WordStepComponent implements OnInit {
    word: WordLink;
  input: String;
  invalid: boolean;

  constructor(/*private wordService:WordService*/) {
  }

  ngOnInit() {
    //this.wordService.initNewTest();
      this.word = new WordLink([new Word('test')], [new Word('test')]);
    this.invalid = false;
  }

  onEnter(e: any) {
    if (e.keyCode != 13) return;
    e.preventDefault();
    /*   if (this.wordService.testWord(this.word, this.input)) {
           this.word = this.wordService.activeTest.getNextWord();
           this.input = '';
           this.invalid = false;
       }
       else {
           this.wordService.activeTest.markInvalid();*/
    this.input = '';
    this.invalid = true;
    this.swing();
    //}
  }

  swing() {
    let component = this;
    setTimeout(function () {
      component.invalid = false;
    }, 1000);
  }
}
