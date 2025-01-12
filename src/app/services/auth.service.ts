import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { API_URL } from '../app.config';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<UserInterface | null> {
    return this.currentUser;
  }

  login(userData: any): Observable<any> {
    return this.http.post(API_URL + '/auth/login', userData, { withCredentials: true }).pipe(
      switchMap(() => {
        return this.getActualUser();
      }),
      tap((user: UserInterface) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.currentUserSubject.next(null);
        return throwError(error);
      })
    );
  }

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(API_URL + '/auth/register', user, { withCredentials: true }).pipe(
      switchMap(() => {
        return this.getActualUser();
      }),
      tap((user: UserInterface) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.currentUserSubject.next(null);
        return throwError(error);
      })
    );
  }

  refreshToken() {
    return this.http.post(API_URL + '/auth/refresh', {}, { withCredentials: true })
  }

  getActualUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(API_URL + '/auth/profile', { withCredentials: true }).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.currentUserSubject.next(null);
        return throwError(error);
      })
    );
  }

  checkAuth(): Observable<{ isAuthenticated: boolean; role: string }> {
    return this.http.get<{ isAuthenticated: boolean; role: string }>(API_URL + '/auth/check', { withCredentials: true });
  }

  subscribeToCurrentUser(callback: (user: UserInterface | null) => void): Subscription {
    return this.currentUser.subscribe((user) => {
      if (!user) {
        console.error('Authenticated User not found');
      }
      callback(user);
    });
  }

  logout(): Observable<any> {
    return this.http.post(API_URL + '/auth/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      }),
      catchError((error) => {
        console.error('Error al cerrar sesión:', error);
        return throwError(error);
      })
    );
  }

}
