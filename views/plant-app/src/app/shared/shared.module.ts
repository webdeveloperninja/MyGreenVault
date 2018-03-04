import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyPipe } from './pipes/empty/empty.pipe';
import { HeaderService } from './services/header/header.service';

import { FormsModule } from '@angular/forms';

import { NotificationService } from './services/notification/notification.service';
import { SideNavService } from './services/side-nav/side-nav.service';
import { PlantsNavigationService } from './services/navigation.plants';
import { KeysPipe } from './pipes/object-keys.pipe';
import { CamelCaseToRegularPipe } from './pipes/camel-case-to-regular';
import { ToasterComponent } from './components/toaster/toaster.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavLinkComponent } from './components/side-nav-link/side-nav-link.component';
import { DisplayOptionsComponent } from './components/display-options/display-options.component';
import { TokenService } from './services/token/token.service';
import { FilterJobPipe } from './pipes/filter-job/filter-job.pipe';
import { JobStatusChipComponent } from './components/job-status-chip/job-status-chip.component';
import { JobStatusNumberToTitlePipe } from './pipes/job-status-number-to-title/job-status-number-to-status-title.pipe';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/search/search.service';
import { AlertComponent } from './components/alert/alert.component';
import { OmniSearchComponent } from './components/omni-search/omni-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CloseComponent } from './components/close/close.component';
import { EmailComponent } from './components/email/email.component';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TextMaskModule,
        NgbModule.forRoot(),
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'primary'
        })
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
      DisplayOptionsComponent,
      JobStatusNumberToTitlePipe,
      FilterJobPipe,
      JobStatusChipComponent,
      AlertComponent,
      OmniSearchComponent,
      CloseComponent,
      EmailComponent
    ],
    providers: [
      NotificationService,
      SideNavService,
      TokenService,
      HeaderService,
      LocalStorageService,
      SearchService,
      PlantsNavigationService
    ],
    exports: [
      HeaderComponent,
      LoadingComponent,
      KeysPipe,
      CamelCaseToRegularPipe,
      JobStatusNumberToTitlePipe,
      EmptyPipe,
      ToasterComponent,
      SideNavComponent,
      ConfirmationPopoverModule,
      DisplayOptionsComponent,
      JobStatusChipComponent,
      FilterJobPipe,
      AlertComponent,
      CloseComponent,
      EmailComponent,
      TextMaskModule
    ]
})
export class SharedModule {}