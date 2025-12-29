import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



export interface User {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

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
