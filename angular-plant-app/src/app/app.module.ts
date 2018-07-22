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
import { TextMaskModule } from 'angular2-text-mask';
import { AppComponent } from './app.component';
import { PlantsModule } from './plants/plants.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routes } from './app.routing';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PlantDetailsModule } from './plant-details/plant-details.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TextMaskModule,
    PlantDetailsModule.forRoot(),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    //todo logOnly based on if production
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: false
    }),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    FormsModule,
    NgProgressModule,
    ChartsModule,
    FlashMessagesModule,
    SharedModule,
    PlantsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  exports: [FlashMessagesModule, RouterModule, TextMaskModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
