import { Injectable } from '@angular/core';
import { PostInterface } from '../interfaces/post-interface';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) { }
  show(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(API_URL + '/posts');
  }

  get(id: number): Observable<PostInterface> {
    return this.http.get<PostInterface>(API_URL + '/posts/' + id,);
  }

  delete(id: number) {
    return this.http.delete(API_URL + '/posts/' + id,);
  }

  update(id: number) {
    return id;
  }
}
