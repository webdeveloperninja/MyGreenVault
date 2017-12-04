import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

export const routes: Routes = [
    { path: 'employees', component: EmployeesComponent },
    { path: 'employees/:employeeId',      component: EmployeeDetailComponent },
];