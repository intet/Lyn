import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'new-test-dialog',
    templateUrl: './new-test.component.html',
    styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
    params:any = {};
    constructor(public dialogRef: MatDialogRef<NewTestComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

    }

}
