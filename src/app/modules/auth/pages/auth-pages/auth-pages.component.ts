import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrls: ['./auth-pages.component.css']
})
export class AuthPagesComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({})
  errorSession: boolean = false

  constructor(private authService: AuthService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
    })
  }

  sendLogin(): void {
    const {email, password} = this.formLogin.value

    this.authService.sendCredentials(email, password)
    .subscribe(success => {
      const {token, user} = success.data

      console.log("Successfull Login", );
      this.cookie.set('auth_token', token, 2, '/')
      this.router.navigate(['/', 'tracks'])
      
    }, err => {
      console.log('Problem login into account, is the email and password correct?')
      this.errorSession = true
    })
    
  }

}
