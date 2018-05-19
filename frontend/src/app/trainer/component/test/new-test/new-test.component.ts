import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TestParam} from "../../../service/entity/test";

@Component({
    selector: 'new-test-dialog',
    templateUrl: './new-test.component.html',
    styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
    params:TestParam = new TestParam();
    constructor(public dialogRef: MatDialogRef<NewTestComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

    }

}
