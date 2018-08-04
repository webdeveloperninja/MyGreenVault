import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TextMaskModule } from 'angular2-text-mask';

import { AlertComponent } from './components/alert/alert.component';
import { CloseComponent } from './components/close/close.component';
import { DisplayOptionsComponent } from './components/display-options/display-options.component';
import { EmailComponent } from './components/email/email.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { JobStatusChipComponent } from './components/job-status-chip/job-status-chip.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OmniSearchComponent } from './components/omni-search/omni-search.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { CamelCaseToRegularPipe } from './pipes/camel-case-to-regular';
import { EmptyPipe } from './pipes/empty/empty.pipe';
import { FilterJobPipe } from './pipes/filter-job/filter-job.pipe';
import { JobStatusNumberToTitlePipe } from './pipes/job-status-number-to-title/job-status-number-to-status-title.pipe';
import { KeysPipe } from './pipes/object-keys.pipe';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { PlantsNavigationService } from './services/navigation.plants';
import { NotificationService } from './services/notification/notification.service';
import { SearchService } from './services/search/search.service';
import { TokenService } from './services/token/token.service';
import { PlantProfilePipe } from './pipes/plant-profile/plant-profile.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MediumComponent } from './components/medium/medium.component';
import { RoomTypeComponent } from './components/room-type/room-type.component';
import { RoomTypeLabelPipe } from './pipes/room-type-label.pipe';
import { RoomTypeImagePipe } from './pipes/room-type-image.pipe';
import { MediumTypeLabelPipe } from './pipes/medium-type-label.pipe';
import { MediumTypeImagePipe } from './pipes/medium-type-image.pipe';
import { ProfileImages } from './pipes/profile-images';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ImageCropperModule,
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
    RoomTypeLabelPipe,
    ProfileImages,
    RoomTypeImagePipe,
    MediumTypeLabelPipe,
    MediumTypeImagePipe,
    DisplayOptionsComponent,
    JobStatusNumberToTitlePipe,
    FilterJobPipe,
    JobStatusChipComponent,
    AlertComponent,
    OmniSearchComponent,
    CloseComponent,
    EmailComponent,
    FileUploadComponent,
    PlantProfilePipe,
    RoomTypeComponent,
    MediumComponent,
    TruncatePipe,
    MomentFormatPipe
  ],
  providers: [NotificationService, TokenService, LocalStorageService, SearchService, PlantsNavigationService, PlantProfilePipe],
  exports: [
    HeaderComponent,
    LoadingComponent,
    KeysPipe,
    CamelCaseToRegularPipe,
    JobStatusNumberToTitlePipe,
    EmptyPipe,
    RoomTypeLabelPipe,
    ProfileImages,
    RoomTypeImagePipe,
    MediumTypeLabelPipe,
    MediumTypeImagePipe,
    ToasterComponent,
    ConfirmationPopoverModule,
    DisplayOptionsComponent,
    JobStatusChipComponent,
    TruncatePipe,
    FilterJobPipe,
    RoomTypeComponent,
    MediumComponent,
    AlertComponent,
    CloseComponent,
    EmailComponent,
    TextMaskModule,
    FileUploadComponent,
    PlantProfilePipe,
    MomentFormatPipe
  ]
})
export class SharedModule {}
