import { Injectable } from '@angular/core';
import { LikeInterface } from '../interfaces/like-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor(private http: HttpClient) { }
  route = '/likes/';

  show(): Observable<LikeInterface[]> {
    return this.http.get<LikeInterface[]>(API_URL + this.route);
  }

  get(id: number): Observable<LikeInterface> {
    return this.http.get<LikeInterface>(API_URL + this.route + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + this.route + id);
  }

  update(id: number, like: LikeInterface): Observable<LikeInterface> {
    return this.http.put<LikeInterface>(API_URL + this.route + id, like);
  }

  create(like: LikeInterface): Observable<LikeInterface> {
    return this.http.post<LikeInterface>(API_URL + this.route, like);
  }
}
