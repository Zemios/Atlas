import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../app.config';
import { backendResponseInterface } from '../interfaces/response-interface';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private backendUrl = API_URL + '/ping';
  private backendResponseSubject: BehaviorSubject<backendResponseInterface> = new BehaviorSubject<backendResponseInterface>({
    statusCode: 404,
    message: 'Backend is not responding',
  });
  private backendResponse$: Observable<backendResponseInterface> = this.backendResponseSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkBackendConnection(): Observable<HttpResponse<backendResponseInterface>> {
    return this.http.get<backendResponseInterface>(this.backendUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<backendResponseInterface>) => {
        this.backendResponseSubject.next(response.body ?? this.backendResponseSubject.value);
        return response;
      }),
      catchError(() => {
        this.backendResponseSubject.next(this.backendResponseSubject.value);
        return of({
          status: 404,
          statusText: 'Backend not found',
        } as HttpResponse<backendResponseInterface>);
      })
    );
  }

  subscribeToBackendResponse(callback: (response: backendResponseInterface) => void): Subscription {
    return this.backendResponse$.subscribe((response) => {
      callback(response);
    });
  }
}
