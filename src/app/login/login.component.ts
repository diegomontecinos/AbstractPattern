import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {

  public user : User;
  dataGroser: any;

  constructor(private loginService: LoginService, private router: Router) {
      this.user = new User();
  }

  validateLogin() {
    if(this.user.username && this.user.password) {
        this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
          this.dataGroser = result['data'][0];
          sessionStorage.setItem('user', this.dataGroser.name);
          sessionStorage.setItem('type', this.dataGroser.type);
          sessionStorage.setItem('wh', this.dataGroser.wh);
          sessionStorage.setItem('whName', this.dataGroser.whName);
          this.router.navigate(['/bodeguero/home']);
        } else {
          alert('Usuario o contraseña incorrecta');
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('Ingrese usurio y contraseña');
    }
  }

}
