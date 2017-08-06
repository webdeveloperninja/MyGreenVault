import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './services/authentication/authentication.service';
import { SharedModule } from '../shared/shared.module';

import { routes } from './authentication.routing';

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
      LoginComponent
    ],
    providers: [
      AuthenticationService
    ],
    exports: [
      LoginComponent
    ]
})
export class AuthenticationModule {}