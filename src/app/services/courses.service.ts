import { Injectable } from '@angular/core';
import { CourseInterface } from '../interfaces/course-interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() { }
  courses: CourseInterface[] = [{
    id: 1,
    title: 'Angular',
    description: 'Angular is a JavaScript framework for building single-page applications',
    creation_date: new Date()
  }];
  data = this.courses;
  show(): Array<CourseInterface> {
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
