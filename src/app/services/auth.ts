import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(){}

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
}
