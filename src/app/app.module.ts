import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


// Define the routes
const ROUTES = [

  {path: '',redirectTo: 'posts',pathMatch: 'full'},
  {path: 'login',component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
