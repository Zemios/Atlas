import { Injectable } from '@angular/core';
import { CoursesInterface } from '../interfaces/courses-interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}
  courses: CoursesInterface[] = [
    {
      id: 1,
      title: 'Curso de JavaScript Avanzado',
      content: { modules: ['Closures', 'Promesas', 'Async/Await'] },
      creation_date: new Date(),
    },
    {
      id: 2,
      title: 'Curso de React',
      content: { modules: ['Componentes', 'Hooks', 'Estado'] },
      creation_date: new Date(),
    },
    {
      id: 3,
      title: 'Curso de Node.js',
      content: { modules: ['Manejo de rutas', 'Express', 'MongoDB'] },
      creation_date: new Date(),
    },
  ];
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
