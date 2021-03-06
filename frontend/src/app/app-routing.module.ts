import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home';
import {LoginComponent} from './security/login';
import {AdminComponent} from './component/admin';
import {AdminGuard, GuestGuard, LoginGuard} from './security/guard';
import {NotFoundComponent} from './security/not-found';
import {ChangePasswordComponent} from './security/change-password';
import {ForbiddenComponent} from './security/forbidden';
import {SignupComponent} from './security/signup';
import {DictionaryComponent} from "./trainer/component/word/dictionary/dictionary.component";
import {TestContainerComponent} from "./trainer/component/test/container/test.container.component";
import {ReaderInputComponent} from "./trainer/component/reader/input/reader.input.component";
import {ComicAdminComponent} from "./comics/component/admin/comic.admin.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'grid',
        component: DictionaryComponent,
        canActivate: [LoginGuard]

    },
    {
        path: 'test',
        component: TestContainerComponent,
        canActivate: [LoginGuard]

    },
    {
        path: 'input',
        component: ReaderInputComponent,
        canActivate: [LoginGuard]

    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [GuestGuard],
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'comic',
        component: ComicAdminComponent,
        canActivate: [AdminGuard]
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '403',
        component: ForbiddenComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
