import { Injectable } from '@angular/core';
import { ProjectInterface } from '../interfaces/project-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) { }
  route = '/projects/';
  show(): Observable<ProjectInterface[]> {
    return this.http.get<ProjectInterface[]>(API_URL + this.route);
  }

  get(id: number): Observable<ProjectInterface> {
    return this.http.get<ProjectInterface>(API_URL + this.route + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + this.route + id);
  }

  update(id: number, project: ProjectInterface): Observable<ProjectInterface> {
    return this.http.put<ProjectInterface>(API_URL + this.route + id, project);
  }

  create(project: ProjectInterface): Observable<ProjectInterface> {
    return this.http.post<ProjectInterface>(API_URL + this.route, project);
  }
}
