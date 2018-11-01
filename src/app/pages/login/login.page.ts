import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  login() {
    this.authService.login()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(err => console.log(err));
  }

  ngOnInit() {
  }

}
