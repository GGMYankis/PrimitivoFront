import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApi } from '../Interfaces/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private urlApi: string = 'https://localhost:7235/api/sale';

  constructor(private http: HttpClient) {}

  List(request:any): Observable<ResponseApi> {
  
    return this.http.post<ResponseApi>(`${this.urlApi}/History` , request  );
  }

  Register(request:any): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}/Register` ,request );
  }

  
}
