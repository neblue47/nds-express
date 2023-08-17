import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';   
import { RoleView, UserADView, UserView } from '../_models/UserView';
import { PageView } from '../_models/PageView';
import { DadosFiscalView, InstituicaoView, RegimeView, RetornoViews } from '@/_models/InstituicaoView';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {
    
    baseUrl = `${environment.urlPrincipal}`;

    constructor(private http: HttpClient) { }
    getAll(): Observable<PageView<InstituicaoView>>{
     return this.http.get<PageView<InstituicaoView>>(`${this.baseUrl}/configuracoes`);
    }
    getDetail(): Observable<RetornoViews>{
        return this.http.get<RetornoViews>(`${this.baseUrl}/configuracoes/details`);
    }
    getInstDetail(): Observable<InstituicaoView>{
      return this.http.get<InstituicaoView>(`${this.baseUrl}/configuracoes/instDetails`);
    }
    getRegimeAll(): Observable<PageView<RegimeView>>{
      return this.http.get<PageView<RegimeView>>(`${this.baseUrl}/configuracoes/regimeMotivos`);
    }
   post(appvmodel: InstituicaoView){
    return this.http.post(`${this.baseUrl}/configuracoes`,appvmodel)
  }
  put(appvmodel: InstituicaoView,id:any){
    return this.http.put(`${this.baseUrl}/configuracoes/${id}`,appvmodel)
  }

  postDadosFiscal(appvmodel: DadosFiscalView){
    return this.http.post(`${this.baseUrl}/configuracoes/dadosFiscal`,appvmodel)
  }
  putDadosFiscal(appvmodel: DadosFiscalView,id:any){
    return this.http.put(`${this.baseUrl}/configuracoes/dadosFiscal/${id}`,appvmodel)
  }
}