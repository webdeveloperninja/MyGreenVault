import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AddReceiverComponent } from './components/add-receiver/add-receiver.component';
import { ReceiversComponent } from './components/receivers/receivers.component';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverService } from './services/receiver';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './receivers.routing';
import { UpdateReceiverComponent } from './components/update-receiver/update-receiver.component';
import { AddReceiverContainerComponent } from './containers/add-receiver-container/add-receiver-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        TextMaskModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot()
    ],
    declarations: [
        ReceiversComponent,
        AddReceiverComponent,
        UpdateReceiverComponent,
        AddReceiverContainerComponent
    ],
    providers: [
        ReceiverService
    ],
    exports: [
        ReceiversComponent,
        AddReceiverComponent
    ]
})
export class ReceiversModule {}