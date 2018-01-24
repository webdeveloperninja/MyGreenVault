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
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import { ReceiversModule } from './receivers/receivers.module';
import { PlantsModule } from './plants/plants.module';
import { SharedModule } from './shared/shared.module';
import { EmployeesModule } from './employees/employees.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SalesInvoiceModule } from './sales-invoice/sales-invoice.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WelcomeComponent } from './welcome/welcome.component';
import { routes } from './app.routing';
import { ConstructionService } from 'app/construction.service';

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
        SalesInvoiceModule,
        PreferencesModule,
        ReceiversModule,
        PlantsModule,
        AuthenticationModule,
        EmployeesModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        ConstructionService
    ],
    exports: [
        FlashMessagesModule,
        RouterModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
