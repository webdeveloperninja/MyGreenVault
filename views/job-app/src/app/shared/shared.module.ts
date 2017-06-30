import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';

import { KeysPipe } from './pipes/object-keys.pipe';
import { CamelCaseToRegularPipe } from './pipes/camel-case-to-regular';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
      HeaderComponent,
      LoadingComponent,
      KeysPipe,
      CamelCaseToRegularPipe
    ],
    providers: [
    ],
    exports: [
      HeaderComponent,
      LoadingComponent,
      KeysPipe,
      CamelCaseToRegularPipe
    ]
})
export class SharedModule {}