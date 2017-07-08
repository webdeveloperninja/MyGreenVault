import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddOperatorComponent } from './components/add-operator/add-operator.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsService } from './services/operators';
import { ActiveOperatorService } from './services/activeOperator';
import { UpdateOperatorComponent } from './components/update-operator/update-operator.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './operators.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot()
    ],
    declarations: [
        OperatorsComponent,
        AddOperatorComponent,
        UpdateOperatorComponent,
    ],
    providers: [
        OperatorsService,
        ActiveOperatorService
    ],
    exports: [
        OperatorsComponent,
        AddOperatorComponent,
        UpdateOperatorComponent
    ]
})
export class OperatorsModule {}