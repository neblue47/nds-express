import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { PageView } from '../_models/PageView';
import { ClienteView, VendaView } from '../_models/VendaView';

@Injectable({
    providedIn: 'root'
  })
  export class VendaService {
      
  baseUrl = `${environment.urlPrincipal}`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<PageView<VendaView>>{
    return this.http.get<PageView<VendaView>>(`${this.baseUrl}/vendas/listagem`);
  }
  
  getOneClienteByTelefone(numTelefone: any): Observable<ClienteView>{
    return this.http.get<ClienteView>(`${this.baseUrl}/clientes/clienteByTelefone/${numTelefone}`);
  }
  post(appvmodel: VendaView){
    return this.http.post(`${this.baseUrl}/vendas`,appvmodel)
  }
  postCliente(appvmodel: ClienteView){
    return this.http.post(`${this.baseUrl}/vendas/saveCliente`,appvmodel)
  }
  anularVenda(itemOpcaoId: any, itemMotivo: any) {
    return this.http.put(`${this.baseUrl}/vendas/anularVenda/${itemOpcaoId}`,itemMotivo);
  }
  }