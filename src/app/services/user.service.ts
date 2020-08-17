import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  authorize(username: string, password: string): Observable<TokenResponse> {
    const headers = { 'Content-Type': 'text/html' };
    return this.http.post(`${environment.apiUrl}/users/authenticate`, { username, password }) as Observable<TokenResponse>;
  }
}

export interface TokenResponse {
  token: string;
}
