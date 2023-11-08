import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageView } from '../_models/PageView';
import { ProductView } from '../_models/ProductView';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrl = `${environment.urlPrincipal}`;
  constructor(private http: HttpClient) { }

  save(model: ProductView)  {
    return this.http.post(`${this.baseUrl}/produtos`,model)
  }
  upsave(model: ProductView,id:any)  {
    return this.http.put(`${this.baseUrl}/produtos/${id}`,model)
  }
  delete(id: any):Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/produtos/${id}`);
  }

  getAll(): Observable<PageView<ProductView>>{
    return this.http.get<PageView<ProductView>>(`${this.baseUrl}/produtos/listagem`);
  }
  getOne(id: any): Observable<ProductView>{
    return this.http.get<ProductView>(`${this.baseUrl}/produtos/${id}`);
  }
}
