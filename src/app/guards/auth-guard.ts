import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('1️⃣ AuthGuard#canActivate called');
    const token = localStorage.getItem('accessToken');

    if (token) {
      console.log('2️⃣ Token found, validating...');
      // Check JWT expiry
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = Date.now() >= payload.exp * 1000;

        console.log(`3️⃣ Token is ${isExpired ? 'expired' : 'valid'}`);
        if (!isExpired) return true;
      } catch (e) {
        console.error('Invalid token format');
      }
    }

    // Token missing or expired
    this.router.navigate(['/login']);
    return false;
  }
}
