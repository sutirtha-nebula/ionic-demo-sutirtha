import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router){}

  setAuthToken(accessToken: string, refreshToken: string) {
    return Promise.all([
    localStorage.setItem('accessToken', accessToken),
    localStorage.setItem('refreshToken', refreshToken)
  ])
  }

  getAuthToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clearAuthToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  logout(){
    this.clearAuthToken();
    this.router.navigate(['/login']);
  }
}
