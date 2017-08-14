import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyPipe } from './pipes/empty/empty.pipe';
import { HeaderService } from './services/header/header.service';

import { NotificationService } from './services/notification/notification.service';
import { SideNavService } from './services/side-nav/side-nav.service';

import { KeysPipe } from './pipes/object-keys.pipe';
import { CamelCaseToRegularPipe } from './pipes/camel-case-to-regular';
import { ToasterComponent } from './components/toaster/toaster.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavLinkComponent } from './components/side-nav-link/side-nav-link.component';
import { DisplayOptionsComponent } from './components/display-options/display-options.component';
import { TokenService } from './services/token/token.service';

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
      ToasterComponent,
      SideNavComponent,
      SideNavLinkComponent,
      DisplayOptionsComponent
    ],
    providers: [
      NotificationService,
      SideNavService,
      TokenService,
      HeaderService
    ],
    exports: [
      HeaderComponent,
      LoadingComponent,
      KeysPipe,
      CamelCaseToRegularPipe,
      EmptyPipe,
      ToasterComponent,
      SideNavComponent,
      DisplayOptionsComponent
    ]
})
export class SharedModule {}