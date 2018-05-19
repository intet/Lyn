import {NgModule} from '@angular/core';
import {SecurityModule} from './../security/security.module'
// material
import {WordStepComponent} from "./component/step/step.component";
import {WordGridComponent} from "./component/word/grid/grid.word.component";
import {WordService} from "./service/word.service";
import {UtilModule} from "../util/util.module";
import {WordAddComponent} from "./component/word/add/add.word.component";
import {DictionaryComponent} from "./component/word/dictionary/dictionary.component";

@NgModule({
    declarations: [
        WordStepComponent, WordGridComponent, WordAddComponent, DictionaryComponent
    ],
    entryComponents: [
        WordAddComponent
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
