import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private backendUrl = 'http://localhost:3000/ping';

  constructor(private http: HttpClient) {}

  checkBackendConnection(): Observable<{ isConnected: boolean; message: string }> {
    return this.http.get(this.backendUrl, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return {
          isConnected: response.status === 200,
          message: response.body?.message || 'No message available',
        };
      }),
      catchError(() => {
        return of({
          isConnected: false,
          message: 'Backend is not reachable',
        });
      })
    );
  }
}
