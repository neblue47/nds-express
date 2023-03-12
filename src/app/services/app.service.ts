import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk'; 
import { Login } from '@/_models/Login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from '@/_services/Auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    private authenticated = false;
  private redirectUrl: any;
  baseUrl = `http://localhost:8080/login`;

    constructor(private router: Router, private toastr: ToastrService,private http: HttpClient,private _auth :AuthService) {}

    async loginByAuth({email, password}) {
        try {
            const token = await Gatekeeper.loginByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    public auth({email, password}): void {
        let model = {} as Login;
        model.email = email;
        model.password = password;
        this.postLogin(model).subscribe(
        (userResponse: any) => {
            if(userResponse.firstLogin){ 
              localStorage.setItem('user_logged',JSON.stringify(userResponse.user));
              localStorage.setItem('token',userResponse.token);
              localStorage.setItem('alertmensagem',userResponse.alertmsg);
              this.authenticated = true;
              this.getProfile();
              this.router.navigate(['/novologin']);
            }
            else{
              localStorage.setItem('user_logged',JSON.stringify(userResponse.userLogado));
              localStorage.setItem('token',userResponse.token);
              localStorage.setItem('alertmensagem',userResponse.alertmsg);
              this.authenticated = true;
              this.user = userResponse.user;
              this.redirectUrl = this.redirectUrl === undefined ? '/' : this.redirectUrl;
              this.router.navigate([this.redirectUrl]);
            }
          },
            (erro: any) => {console.log(erro); this.toastr.error('O utilizador não existe ou credencias incorrectas.','',{timeOut: 5000}); }
        );
         
      }
      postLogin(appvmodel: Login){
        return this.http.post(`${this.baseUrl}/autenticacao`,appvmodel)
      }

    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
           let isLogged = this._auth.isAuthenticated();
           if(isLogged)
            this.user = {...JSON.parse(localStorage.getItem('user_logged')!),createdAt:new Date()}
         else
            this.logout();
        } catch (error) {
            this.logout();
            throw error;
        }
    }
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        localStorage.removeItem('user_logged');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
