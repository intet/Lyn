import {NgModule} from '@angular/core';
import {SecurityModule} from './../security/security.module'
// material
import {UtilModule} from "../shared/util/util.module";
import {ComicAdminComponent} from "./component/admin/comic.admin.component";
import {ComicsService} from "./service/comics.service";

@NgModule({
    declarations: [
        ComicAdminComponent
    ],
    entryComponents: [],
    providers: [
        ComicsService
    ],
    imports: [
        UtilModule,
        SecurityModule,
    ]
})
export class ComicModule {
}
