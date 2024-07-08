import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7197/api/UserAuth/login';
  constructor(private httpClient: HttpClient) { }
  login(data: any) {    
    return this.httpClient.post(`${this.baseUrl}`, data)
      .pipe(tap((result) => {
        // const token = result.data.token;
        // localStorage.setItem('Token',token);
      }));
  }
  logout() {
    localStorage.removeItem('Token');
  }
  isLoggedIn() {
    return localStorage.getItem('Token') !== null;
  }
}