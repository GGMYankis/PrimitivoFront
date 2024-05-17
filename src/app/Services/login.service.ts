import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi: string = 'https://localhost:7235/api/User';

  constructor(private http: HttpClient) {}


  Login(request:any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}/Login` , request);
  }

}
