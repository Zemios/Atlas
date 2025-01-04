import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(API_URL + '/auth/register', user);
  }
}
