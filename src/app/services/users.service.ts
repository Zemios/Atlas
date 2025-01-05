import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }
  route = '/users/';
  show(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(API_URL + this.route);
  }

  get(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(API_URL + this.route + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + this.route + id);
  }

  update(id: number, user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(API_URL + this.route + id, user);
  }

  create(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(API_URL + this.route, user);
  }

}
