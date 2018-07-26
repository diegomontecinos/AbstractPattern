import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTING } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SpinnerModule} from 'primeng/spinner';
import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeBodegueroComponent } from './home-bodeguero/home-bodeguero.component';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';
import { ShowDispatchComponent } from './show-dispatch/show-dispatch.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { ShowAcquisitionComponent } from './show-acquisition/show-acquisition.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MenubarGrocerComponent } from './menubar-grocer/menubar-grocer.component';
import { ShowOrder0Component } from './show-order0/show-order0.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeBodegueroComponent,
    ShowInventoryComponent,
    ShowDispatchComponent,
    ShowOrderComponent,
    ShowAcquisitionComponent,
    MenubarComponent,
    MenubarGrocerComponent,
    ShowOrder0Component
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    PanelMenuModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    SpinnerModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
