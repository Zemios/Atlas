import { Injectable } from '@angular/core';
import { NewsInterface } from '../interfaces/news-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  route = '/news/';

  show(): Observable<NewsInterface[]> {
    return this.http.get<NewsInterface[]>(API_URL + this.route);
  }

  get(id: number): Observable<NewsInterface> {
    return this.http.get<NewsInterface>(API_URL + this.route + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + this.route + id);
  }

  update(id: number, news: NewsInterface): Observable<NewsInterface> {
    return this.http.put<NewsInterface>(API_URL + this.route + id, news);
  }

  create(news: NewsInterface): Observable<NewsInterface> {
    return this.http.post<NewsInterface>(API_URL + this.route, news);
  }
}
