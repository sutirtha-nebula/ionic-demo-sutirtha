import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api';

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

  constructor(private apiService: ApiService){}

  login(){
    if(this.loginForm.invalid){
      return;
    }

    this.apiService.post('auth/login', this.loginForm.value).subscribe(
      (response)=>{
        console.log('Login successful', response);
      },
      (error)=> {
        console.log('error', error);
      }
    )
  }
}
