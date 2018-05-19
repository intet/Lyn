import {NgModule} from '@angular/core';
import {SecurityModule} from './security/security.module'
// material
import {MatIconRegistry, MatPaginatorIntl} from '@angular/material';
import {AppComponent} from './component/app/app.component';
import {HomeComponent} from './component/home';
import {AccountMenuComponent} from './component/header/account-menu/account-menu.component';
import {ApiCardComponent, HeaderComponent} from './component';
import {AdminComponent} from "./component/admin/admin.component";
import {TrainerModuleModule} from "./trainer/trainer.module";
import {UtilModule} from "./shared/util/util.module";
import {getRussianPaginatorIntl} from "./shared/util/russian-paginator-intl";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApiCardComponent,
    HomeComponent,
    AccountMenuComponent,
    AdminComponent
  ],
  imports: [
    UtilModule,
    SecurityModule,
    TrainerModuleModule,
    AppRoutingModule,
  ],
  providers: [
    MatIconRegistry,
    {provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl()}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
