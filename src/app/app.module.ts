import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTING } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from 'primeng/datatable';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeBodegueroComponent } from './home-bodeguero/home-bodeguero.component';
import { ShowInventoryComponent } from './show-inventory/show-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeBodegueroComponent,
    ShowInventoryComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
