import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
 

import { Login } from '../_models/Login';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private redirectUrl: any;
  baseUrl = `${environment.urlPrincipal}/login`;
 
constructor(private router: Router,private http: HttpClient,private toastr: ToastrService) { }
public setRedirectUrl(url: string) {
  this.redirectUrl = url;
}

public auth(login: string, password: string): void {
  let model = {} as Login;
  model.username = login;
  model.password = password;
  this.postLogin(model).subscribe(
    (userResponse: any) => {
      if(userResponse.firstLogin){ 
        localStorage.setItem('user_logged',JSON.stringify(userResponse.user));
        localStorage.setItem('token',userResponse.token);
        localStorage.setItem('alertmensagem',userResponse.alertmsg);
        this.authenticated = true;
        this.router.navigate(['/novologin']);
      }
      else{
        localStorage.setItem('user_logged',JSON.stringify(userResponse.userLogado));
        localStorage.setItem('token',userResponse.token);
        localStorage.setItem('alertmensagem',userResponse.alertmsg);
        this.authenticated = true;
        this.redirectUrl = this.redirectUrl === undefined ? '/' : this.redirectUrl;
        this.router.navigate([this.redirectUrl]);
      }
    },
      (erro: any) => {console.log(erro); this.toastr.error('O utilizador não existe ou credencias incorrectas.','',{timeOut: 5000}); }
  );
   
}
public authAD(login: string, password: string,domain:string): void {
  let model = {} as Login;
  model.username = login;
  model.password = password;
   
  this.postLoginWithAD(model).subscribe(
    (appretorno: any) => {
      if(appretorno.error){
          return appretorno.error;
      }
      else{
        console.log(JSON.stringify(appretorno.token));
        if(appretorno.user.firstLogin){ 
          localStorage.setItem('user_logged',JSON.stringify(appretorno.user));
          localStorage.setItem('token',appretorno.token);
          localStorage.setItem('alertmensagem',appretorno.alertmsg);
          this.authenticated = true;
          this.router.navigate(['/novologin']);
        }
        else{
          localStorage.setItem('user_logged',JSON.stringify(appretorno.user));
          localStorage.setItem('token',appretorno.token);
          localStorage.setItem('alertmensagem',appretorno.alertmsg);
          this.authenticated = true;
          this.redirectUrl = this.redirectUrl === undefined ? '/' : this.redirectUrl;
          this.router.navigate([this.redirectUrl]);
        }
        
      }
     
    },
      (erro: any) => {console.log(erro); this.toastr.error('O utilizador não existe no dominio ou credencias incorrectas.','',{timeOut: 5000}); }
  );
   
}
 
postLogin(appvmodel: Login){
  return this.http.post(`${this.baseUrl}/autenticacao`,appvmodel)
}
postLoginWithAD(appvmodel: Login){
  console.log(appvmodel);
  return this.http.post(`${this.baseUrl}/Login`,appvmodel)
}
getAuthorizationToken() {
  const token = window.localStorage.getItem('token');
  return token;
} 
public isAuthenticated(): boolean {
  const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
}
logout() {                            // {4}
  this.authenticated = false;
  localStorage.clear();
  this.router.navigate(['/login']);
  }
  rediretToHome(){
    this.router.navigate(['/']);
  }
  forbidden() {                            // {4}
     
    this.router.navigate(['/login']);
    }
  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }
  
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode.default(token);
    const date = new Date(0);
    if (decoded.exp === undefined) {
      return date;
    }

     
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
