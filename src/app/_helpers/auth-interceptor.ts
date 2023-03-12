import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { AuthService } from '../_services/Auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authservice: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this._authservice.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token && !this._authservice.isTokenExpired(token)) {
      // O request é imutavel, ou seja, não é possível mudar nada
      // Faço o clone para conseguir mudar as propriedades
      // Passo o token de autenticação no header
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // retorno o request com o erro tratado
    return next.handle(request);
  }

   
}