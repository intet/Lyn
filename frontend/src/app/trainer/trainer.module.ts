import {NgModule} from '@angular/core';
import {SecurityModule} from './../security/security.module'
// material
import {WordGridComponent} from "./component/word/grid/grid.word.component";
import {WordService} from "./service/word.service";
import {UtilModule} from "../shared/util/util.module";
import {WordAddComponent} from "./component/word/add/add.word.component";
import {DictionaryComponent} from "./component/word/dictionary/dictionary.component";
import {TestContainerComponent} from "./component/test/container/test.container.component";
import {NewTestComponent} from "./component/test/new-test/new-test.component";
import {WordStepComponent} from "./component/test/step/step.component";
import {ReaderInputComponent} from "./component/reader/input/reader.input.component";

@NgModule({
    declarations: [
        WordStepComponent, WordGridComponent, WordAddComponent, DictionaryComponent,
        TestContainerComponent, NewTestComponent, ReaderInputComponent
    ],
    entryComponents: [
        WordAddComponent, NewTestComponent
    ],
    providers: [
        WordService
    ],
    imports: [
        UtilModule,
        SecurityModule,
    ]
})
export class TrainerModuleModule {
}
