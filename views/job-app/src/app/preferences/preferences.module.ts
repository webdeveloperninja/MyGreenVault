import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PreferenceContainerComponent } from './components/preference-container/preference-container.component';
import { routes } from './preferences.routing';

@NgModule({
    imports: [
        SharedModule,
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