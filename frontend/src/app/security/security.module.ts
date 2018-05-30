import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
// material
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login';
import {AdminGuard, GuestGuard, LoginGuard} from './guard';
import {NotFoundComponent} from './not-found';

import {ApiService, AuthService, ConfigService, FooService, UserService} from './service';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {SignupComponent} from './signup/signup.component';
import {FlexLayoutModule} from "@angular/flex-layout";

export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}

@NgModule({
    declarations: [
        LoginComponent,
        NotFoundComponent,
        ChangePasswordComponent,
        ForbiddenComponent,
        SignupComponent
    ],
    imports: [
        FlexLayoutModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        MatMenuModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ],
    providers: [
        LoginGuard,
        GuestGuard,
        AdminGuard,
        FooService,
        AuthService,
        ApiService,
        UserService,
        ConfigService,
        MatIconRegistry,
        {
            'provide': APP_INITIALIZER,
            'useFactory': initUserFactory,
            'deps': [UserService],
            'multi': true
        }
    ]
})
export class SecurityModule {
}
