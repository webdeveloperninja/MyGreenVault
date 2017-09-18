import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddToolComponent } from './components/add-tool/add-tool.component';
import { ToolsComponent } from './components/tools/tools.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolsService } from './services/tools';
import { ActiveToolService } from './services/activeTool';
import { UpdateToolComponent } from './components/update-tool/update-tool.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './tools.routing';
import { AddToolQtyComponent } from './components/add-tool-qty/add-tool-qty.component';
import { CheckoutToolComponent } from './components/checkout-tool/checkout-tool.component';
import { ToolQtyStatusComponent } from './components/tools/tool-qty-status/tool-qty-status.component';

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
        AddToolQtyComponent,
        CheckoutToolComponent,
        ToolQtyStatusComponent,
    ],
    providers: [
        ToolsService,
        ActiveToolService
    ],
    exports: [
        ToolsComponent,
        AddToolComponent,
        UpdateToolComponent
    ]
})
export class ToolsModule {}