import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesService } from './services/employees';
import { ActiveEmployeeService } from './services/activeEmployee';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './employees.routing';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

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
        EmployeesComponent,
        AddEmployeeComponent,
        UpdateEmployeeComponent,
        EmployeeDetailComponent,
    ],
    providers: [
        EmployeesService,
        ActiveEmployeeService
    ],
    exports: [
        EmployeesComponent,
        AddEmployeeComponent,
        UpdateEmployeeComponent
    ]
})
export class EmployeesModule {}