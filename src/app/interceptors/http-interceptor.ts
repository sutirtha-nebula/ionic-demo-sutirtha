import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // 1️⃣ Get token if it exists
    const token = localStorage.getItem('token');

    // 2️⃣ Clone request to add Authorization header if token exists
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // 3️⃣ Send request and handle errors globally
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Example: handle 401 or 500
        if (error.status === 401) {
          console.error('Unauthorized! Redirect to login.');
        } else {
          console.error('API Error:', error);
        }
        return throwError(error);
      })
    );
  }
}
