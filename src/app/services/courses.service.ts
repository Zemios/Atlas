import { Injectable } from '@angular/core';
import { CoursesInterface } from '../interfaces/courses-interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}
  courses: CoursesInterface[] = [];
  data = this.courses;
  show(): Array<CoursesInterface> {
    return this.data;
  }

  get(id: number) {
    return this.data.find((item) => item.id === id);
  }

  delete(id: number) {
    return id;
  }

  update(id: number) {
    return id;
  }
}
