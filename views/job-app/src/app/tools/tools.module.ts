import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddToolComponent } from './components/add-tool/add-tool.component';
import { ToolsComponent } from './components/tools/tools.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolsService } from './services/tools';
import { ActiveToolService } from './services/activeTool';
import { SettingsService } from './services/settings';
import { SidebarService } from './services/sidebar';
import { UpdateToolComponent } from './components/update-tool/update-tool.component';


import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './tools.routing';

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
        ToolsComponent,
        AddToolComponent,
        UpdateToolComponent,
    ],
    providers: [
        ToolsService,
        SettingsService,
        SidebarService,
        ActiveToolService
    ],
    exports: [
        ToolsComponent,
        AddToolComponent,
        UpdateToolComponent
    ]
})
export class ToolsModule {}