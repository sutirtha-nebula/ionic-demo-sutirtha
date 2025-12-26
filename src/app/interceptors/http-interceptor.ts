import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {


  constructor(private errorService: ErrorService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // 1️⃣ Get token if it exists
    const token = localStorage.getItem('accessToken');

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
        console.log(error.error)
        // Example: handle 401 or 500
        if (error.status === 401) {
          this.errorService.showAlert('Unauthorized', 'Your session has expired. Please log in again.');
        } else {
          this.errorService.showError(error.error.message || 'An error occurred. Please try again later.');
        }
        return throwError(error);
      })
    );
  }
}
