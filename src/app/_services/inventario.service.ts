import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageView } from '../_models/PageView';
import { ItemEntradaPack, ItemEntradaView, ProductView } from '../_models/ProductView';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  baseUrl = `${environment.urlPrincipal}`;
  constructor(private http: HttpClient) { }

  save(model: ItemEntradaPack)  {
    return this.http.post(`${this.baseUrl}/inventarios`,model)
  }
  upsave(model: ItemEntradaPack,id:any)  {
    return this.http.put(`${this.baseUrl}/inventarios/${id}`,model)
  }
  delete(id: any):Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/inventarios/${id}`);
  }

  getAll(): Observable<PageView<ItemEntradaView>>{
    return this.http.get<PageView<ItemEntradaView>>(`${this.baseUrl}/inventarios`);
  }
  getAllAvaiable(): Observable<PageView<ItemEntradaView>>{
    return this.http.get<PageView<ItemEntradaView>>(`${this.baseUrl}/inventarios/produtosDisponiveis`);
  }
  getOne(id: any): Observable<ItemEntradaView>{
    return this.http.get<ItemEntradaView>(`${this.baseUrl}/inventarios/${id}`);
  }
  getOneProduct(itemId: any): Observable<ItemEntradaView>{
    return this.http.get<ItemEntradaView>(`${this.baseUrl}/inventarios/produtoSelecionado/${itemId}`);
  }
}