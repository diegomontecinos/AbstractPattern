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

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeBodegueroComponent } from './home-bodeguero/home-bodeguero.component';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';
import { ShowDispatchComponent } from './show-dispatch/show-dispatch.component';
import { ShowOrderComponent } from './show-order/show-order.component';
import { ShowAcquisitionComponent } from './show-acquisition/show-acquisition.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeBodegueroComponent,
    ShowInventoryComponent,
    ShowDispatchComponent,
    ShowOrderComponent,
    ShowAcquisitionComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    PanelMenuModule,
    PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
