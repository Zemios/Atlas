import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/auth/register';

  constructor(private http: HttpClient) { }

  registerUser(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
