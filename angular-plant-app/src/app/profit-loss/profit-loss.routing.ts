import { Routes } from '@angular/router';
import { ProfitLossComponent } from './containers/profit-loss/profit-loss.component';

export const routes: Routes = [{ path: 'plants/:id', component: ProfitLossComponent }];
