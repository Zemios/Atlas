import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { API_URL } from '../app.config';
import { UserInterface } from '../interfaces/user-interface';
import { authResponseInterface } from '../interfaces/response-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserInterface | undefined> = new BehaviorSubject<UserInterface | undefined>(undefined);
  private authResponseSubject: BehaviorSubject<authResponseInterface> = new BehaviorSubject<authResponseInterface>({
    statusCode: 401,
    message: 'Unauthorized',
  });
  public currentUser$: Observable<UserInterface | undefined> = this.currentUserSubject.asObservable();
  public authResponse$: Observable<authResponseInterface> = this.authResponseSubject.asObservable();
  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post(API_URL + '/auth/login', userData, { withCredentials: true }).pipe(
      switchMap(() => {
        return this.getActualUser();
      }),
      tap((user: UserInterface) => {
        this.currentUserSubject.next(user);
        this.checkAuth()
        /* TODO: No se como volver a asignar el valor de check auth una vez se subscribe, a no se r que sea a mano */
      }),
      catchError((error) => {
        this.currentUserSubject.next(undefined);
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
        this.checkAuth()
      }),
      catchError((error) => {
        this.currentUserSubject.next(undefined);
        return throwError(error);
      })
    );
  }

  refreshToken() {
    return this.http.post(API_URL + '/auth/refresh', {}, { withCredentials: true });
  }

  getActualUser(): Observable<UserInterface> {
    console.log('getActualUser')
    return this.http.get<UserInterface>(API_URL + '/auth/profile', { withCredentials: true }).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        this.checkAuth()
      }),
      catchError((error) => {
        this.currentUserSubject.next(undefined);
        this.checkAuth()
        return throwError(error);
      })
    );
  }

  checkAuth(): Observable<authResponseInterface> {
    console.log('checkAuth')
    return this.http.get<authResponseInterface>(API_URL + '/auth/check', { withCredentials: true }).pipe(
      tap((response) => {
        this.authResponseSubject.next(response);
      }),
      catchError((error) => {
        this.authResponseSubject.next(this.authResponseSubject.value);
        return throwError(error);
      })
    );
  }

  subscribeToCurrentUser(callback: (user: UserInterface | undefined) => void): Subscription {
    console.log('subscribeToCurrentUser')
    return this.currentUser$.subscribe((user) => {
      if (!user) {
        console.error('Authenticated User not found');
      }
      callback(user);
    });
  }
  subscribeToAuthResponse(callback: (response: authResponseInterface) => void): Subscription {
    console.log('subscribe auth')
    return this.authResponse$.subscribe((response) => {
      callback(response);
    });
  }

  logout(): Observable<any> {
    return this.http.post(API_URL + '/auth/logout', {}, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUserSubject.next(undefined);
        this.authResponseSubject.next({
          statusCode: 401,
        });
      }),
      catchError((error) => {
        console.error('Error al cerrar sesión:', error);
        return throwError(error);
      })
    );
  }
}
