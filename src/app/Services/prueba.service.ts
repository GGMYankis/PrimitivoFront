import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private urlApi: string = 'https://localhost:7235/api/email';

  constructor(private http: HttpClient) {}


  Send(request: any, headers?: HttpHeaders): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}/Send`, request, { headers: headers });
  }
}
