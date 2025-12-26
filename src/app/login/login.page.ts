import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router){}

  login(){
    if(this.loginForm.invalid){
      return;
    }

    this.apiService.post('auth/login', this.loginForm.value).subscribe(
      (response)=>{
        this.authService.setAuthToken(response.accessToken, response.refreshToken);
        this.router.navigate(['/dashboard']);
      },
      (error)=> {
        console.log('error', error);
      }
    )
  }
}
