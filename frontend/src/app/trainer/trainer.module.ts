import {NgModule} from '@angular/core';
import {SecurityModule} from './../security/security.module'
// material
import {WordStepComponent} from "./component/step/step.component";
import {WordGridComponent} from "./component/grid/word/grid.word.component";
import {WordService} from "./service/word.service";
import {UtilModule} from "../util/util.module";

@NgModule({
  declarations: [
    WordStepComponent, WordGridComponent
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
