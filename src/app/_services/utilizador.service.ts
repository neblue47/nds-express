import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';   
import { RoleView, UserADView, UserView } from '../_models/UserView';
import { PageView } from '../_models/PageView';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {
  
baseUrl = `${environment.urlPrincipal}`;

getUserById(id: any):Observable<PageView<UserView>> {
  return this.http.get<PageView<UserView>>(`${this.baseUrl}/utilizadores/${id}`);
}
deleteUserById(id: any) {
  return this.http.delete<boolean>(`${this.baseUrl}/utilizadores/${id}`);
}
constructor(private http: HttpClient) { }
getAll(): Observable<PageView<UserView>>{
  return this.http.get<PageView<UserView>>(`${this.baseUrl}/utilizadores`);
}
getUserLogadoDetail(): Observable<UserView>{
  return this.http.get<UserView>(`${this.baseUrl}/utilizadores/utilizadorDetail`);
}
getAllRoles(): Observable<RoleView[]>{
  return this.http.get<RoleView[]>(`${this.baseUrl}/GetAllRoles`);
}

getDomainFromAd(): Observable<string>{
  return this.http.get<string>(`${this.baseUrl}/GetDomainFromAd`);
}
getAllUsersFromAD(): Observable<UserADView[]>{
  return this.http.get<UserADView[]>(`${this.baseUrl}/GetAllUsersFromAd`);
}
post(appvmodel: UserView){
  return this.http.post(`${this.baseUrl}/utilizadores`,appvmodel)
}
put(appvmodel: UserView,id:any){
  return this.http.put(`${this.baseUrl}/utilizadores/${id}`,appvmodel)
}

postConfirm(appvmodel: UserView):Observable<boolean>{
  return this.http.post<boolean>(`${this.baseUrl}/PostConfirUserView`,appvmodel)
}
}