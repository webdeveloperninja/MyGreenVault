import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { PreferenceContainerComponent } from './components/preference-container/preference-container.component';
import { routes } from './preferences.routing';

@NgModule({
    imports: [
        SharedModule,
        NgbModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    declarations: [
        PreferenceContainerComponent
    ],
    providers: [
    ],
    exports: [
    ]
})
export class PreferencesModule {}