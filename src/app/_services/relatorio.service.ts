import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { PageView } from '../_models/PageView';
import { ClienteView, RelatorioVendaView, VendaFilter, VendaView } from '../_models/VendaView';

@Injectable({
    providedIn: 'root'
  })
  export class RelatorioService {
  
      
  baseUrl = `${environment.urlPrincipal}/relatorios`;
  constructor(private http: HttpClient) { }

  getAllVendas(): Observable<PageView<RelatorioVendaView>>{
    return this.http.get<PageView<RelatorioVendaView>>(`${this.baseUrl}/vendas`);
  } 
  getAllVendasDiaria(): Observable<PageView<RelatorioVendaView>>{
    return this.http.get<PageView<RelatorioVendaView>>(`${this.baseUrl}/vendas-diaria`);
  } 
  getAllVendasByFilter(filter:VendaFilter): Observable<PageView<RelatorioVendaView>>{
    return this.http.post<PageView<RelatorioVendaView>>(`${this.baseUrl}/vendasByFilter`,filter);
  }
  getVendaInvoice(vendaId:any): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${this.baseUrl}/printRelatorioRes/${vendaId}`,httpOptions);
  }
  getInvoice(vendaId:any): Observable<any>{
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${this.baseUrl}/printFactura/${vendaId}`,httpOptions);
  } 
 
  }