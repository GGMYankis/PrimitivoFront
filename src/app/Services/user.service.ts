import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string = 'https://localhost:7235/api/user';

  constructor(private http: HttpClient) {}

  List(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/List`);
  }
}
