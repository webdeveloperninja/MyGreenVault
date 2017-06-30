import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { JobsModule } from './jobs/jobs.module';
import { SharedModule } from './shared/shared.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    SharedModule,
    JobsModule,
    AppRoutingModule,
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
