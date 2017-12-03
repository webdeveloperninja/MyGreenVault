import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';

import { WeedModule } from './weed/weed.module';
import { SharedModule } from './shared/shared.module';
import { EmployeesModule } from './employees/employees.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WelcomeComponent } from './welcome/welcome.component';
import { routes } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        FlashMessagesModule,
        SharedModule,
        PreferencesModule,
        WeedModule,
        AuthenticationModule,
        EmployeesModule,
        NgbModule.forRoot(),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
    exports: [
        FlashMessagesModule,
        RouterModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
