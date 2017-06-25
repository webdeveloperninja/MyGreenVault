import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'ngx-flash-messages';

import { AppComponent } from './app.component';

import { JobsModule } from './jobs/jobs.module';
import { SharedModule } from './shared/shared.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [
    { path: 'add-job', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    SharedModule,
    JobsModule,
    NgbModule.forRoot(),
  ],
  providers: [
  ],
  exports: [
    FlashMessagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
