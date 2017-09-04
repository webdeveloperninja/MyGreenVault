import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { JobsModule } from './jobs/jobs.module';
import { ToolsModule } from './tools/tools.module';
import { SharedModule } from './shared/shared.module';
import { OperatorsModule } from './operators/operators.module';
import { AuthenticationModule } from './authentication/authentication.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { WelcomeComponent } from './welcome/welcome.component';
import { routes } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    FlashMessagesModule,
    SharedModule,
    JobsModule,
    ToolsModule,
    AuthenticationModule,
    OperatorsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
    FlashMessagesModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
