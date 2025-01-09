import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post(API_URL + '/auth/login', userData, { withCredentials: true });
  }

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(API_URL + '/auth/register', user, { withCredentials: true });
  }

  refreshToken() {
    return this.http.post(API_URL + '/auth/refresh', {}, { withCredentials: true });
  }

  getActualUser() {
    return this.http.get<UserInterface>(API_URL + '/auth/profile', { withCredentials: true });
  }
  checkAuth(): Observable<{ isAuthenticated: boolean; role: string }> {
    return this.http.get<{ isAuthenticated: boolean; role: string }>(API_URL + '/auth/check', { withCredentials: true });
  }

  logout() {
    return this.http.post(API_URL + '/auth/logout', {}, { withCredentials: true });
  }
}
