import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Check JWT expiry
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = Date.now() >= payload.exp * 1000;
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
