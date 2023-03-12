import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { AuthService } from '../_services/Auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _authservice: AuthService) { }

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this._authservice.forbidden();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
   }

   
}