import { Injectable } from '@angular/core';
import { PostInterface } from '../interfaces/post-interface';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  private route = '/posts/';

  show(page: number = 1, limit: number = 10): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(API_URL + this.route + `?page=${page}&limit=${limit}`, { withCredentials: true });
  }

  get(id: number): Observable<PostInterface> {
    return this.http.get<PostInterface>(API_URL + this.route + id, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + this.route + id, { withCredentials: true });
  }

  create(postData: { title: string; content: string }): Observable<PostInterface> {
    return this.http.post<PostInterface>(API_URL + this.route, postData, { withCredentials: true });
  }
}
