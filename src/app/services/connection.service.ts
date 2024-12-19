import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private backendUrl = 'https://localhost:3000/api';

  constructor(private http: HttpClient) { }

  checkBackendConnection(): Observable<any> {
    return this.http.get(this.backendUrl);
  }
}
