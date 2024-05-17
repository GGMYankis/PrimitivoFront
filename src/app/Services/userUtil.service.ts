import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserUtilService {
  constructor() {}

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const dataCadena = localStorage.getItem('user');
    const user = JSON.parse(dataCadena!);
    return user;
  }
  
}
