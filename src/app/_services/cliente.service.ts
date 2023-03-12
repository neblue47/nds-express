import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageView } from '../_models/PageView';
import { ClienteView, ContaClienteView } from '../_models/VendaView';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = `${environment.urlPrincipal}`;
  constructor(private http: HttpClient) { }

  getContaClienteAll(): Observable<PageView<ContaClienteView>>{
    return this.http.get<PageView<ContaClienteView>>(`${this.baseUrl}/clientes`);
  }
}
