import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeBodegueroComponent } from './home-bodeguero/home-bodeguero.component';

export const AppRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home_bodeguero', component: HomeBodegueroComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
