import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyPipe } from './pipes/empty/empty.pipe';

import { NotificationService } from './services/notification/notification.service';

import { KeysPipe } from './pipes/object-keys.pipe';
import { CamelCaseToRegularPipe } from './pipes/camel-case-to-regular';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
      HeaderComponent,
      LoadingComponent,
      KeysPipe,
      CamelCaseToRegularPipe,
      EmptyPipe,
      ToasterComponent
    ],
    providers: [
      NotificationService
    ],
    exports: [
      HeaderComponent,
      LoadingComponent,
      KeysPipe,
      CamelCaseToRegularPipe,
      EmptyPipe,
      ToasterComponent
    ]
})
export class SharedModule {}