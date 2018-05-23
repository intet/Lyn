import {Component, OnInit} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {WordAddComponent} from "../add/add.word.component";
import {WordService} from "../../../service/word.service";
import {NewTestComponent} from "../../test/new-test/new-test.component";
import {Router} from "@angular/router";
import {TestParam} from "../../../service/entity/test-param";
import {RowLink} from "../add/list/list.word.component";

@Component({
    selector: 'dictionary',
    templateUrl: './dictionary.component.html',
    styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
    constructor(public dialog: MatDialog, private wordService: WordService, private router:Router) {
    }

    ngOnInit() {

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(WordAddComponent);
        dialogRef.afterClosed().subscribe((result:RowLink) => {
            if (result) {
            }
        });
    }
    newTest(): void {
        let config = new MatDialogConfig();
        config.width = '250px';
        let dialogRef = this.dialog.open(NewTestComponent, config);
        dialogRef.afterClosed().subscribe((result: TestParam) => {
            if(result){
                this.router.navigate(['/test', result]);
            }
        });
    }
}

