import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeBodegueroComponent } from './home-bodeguero/home-bodeguero.component';
import { ShowDispatchComponent } from './show-dispatch/show-dispatch.component';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';
import { ShowAcquisitionComponent } from './show-acquisition/show-acquisition.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { ShowOrder0Component } from './show-order0/show-order0.component';
import { ShowWithdrawComponent } from './show-withdraw/show-withdraw.component';

export const AppRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'bodeguero/home', component: HomeBodegueroComponent },
    { path: 'bodeguero/despachos', component: ShowDispatchComponent },
    { path: 'bodeguero/inventario', component: ShowInventoryComponent },
    { path: 'adquisiciones', component: ShowAcquisitionComponent },
    { path: 'bodeguero/ordenes', component: ShowOrderComponent },
    { path: 'bodeguero/ordenes0', component: ShowOrder0Component },
    { path: 'bodeguero/retiros', component: ShowWithdrawComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
