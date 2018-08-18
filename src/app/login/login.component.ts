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

  constructor(private loginService: LoginService, private router: Router) {
      this.user = new User();
  }

  validateLogin() {
    sessionStorage.setItem('user', this.user.username);
    if(this.user.username && this.user.password) {
        this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
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
