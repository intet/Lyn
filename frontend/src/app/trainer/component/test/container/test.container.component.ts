import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TestParam} from "../../../service/entity/test-param";
import {TestService} from "../../../service/test.service";
import {Test} from "../../../service/entity/test";

@Component({
    selector: 'test-container',
    templateUrl: './test.container.component.html',
    styleUrls: ['./test.container.component.css']
})
export class TestContainerComponent implements OnInit {
    readonly params: TestParam;
    test: Test;
    public isLoading: boolean = true;

    constructor(private testService: TestService,
                route: ActivatedRoute) {
        this.params = route.snapshot.params as TestParam;
    }
    ngOnInit() {
        this.isLoading = true;
        this.testService.createTest(this.params).subscribe((test: Test) => {
            this.isLoading = false;
            this.test = test;
        });
    }
}

