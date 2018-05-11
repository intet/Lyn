import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home';
import {LoginComponent} from './security/login';
import {AdminComponent} from './admin';
import {AdminGuard, GuestGuard, LoginGuard} from './security/guard';
import {NotFoundComponent} from './security/not-found';
import {ChangePasswordComponent} from './security/change-password';
import {ForbiddenComponent} from './security/forbidden';
import {SignupComponent} from './security/signup';
import {WordStepComponent} from "./trainer/component/step/step.component";
import {WordGridComponent} from "./trainer/component/word/grid/grid.word.component";
import {WordAddComponent} from "./trainer/component/word/add/add.word.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'signup',
    component: SignupComponent,
    canActivate: [GuestGuard],
    pathMatch:'full'
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
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: 'word',
    component: WordStepComponent
  },
  {
    path: 'grid',
    component: WordGridComponent
  },
  {
      path: 'add',
      component: WordAddComponent
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
export class AppRoutingModule { }
