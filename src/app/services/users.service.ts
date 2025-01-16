import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { API_URL } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  route = '/users/';
  show(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(API_URL + this.route);
  }

  get(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(API_URL + this.route + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + this.route + id, { withCredentials: true });
  }

  update(formData: FormData): Observable<UserInterface> {
    return this.authService.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (!currentUser) {
          return throwError(() => new Error('User authenticated not found.'));
        }
        const userId = currentUser.id;
        return this.http.put<UserInterface>(API_URL + this.route + userId, formData, { withCredentials: true });
      }),
      catchError((error) => {
        console.error('Error en la actualización del perfil', error);
        throw error;
      })
    );
  }

  create(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(API_URL + this.route, user);
  }
}
