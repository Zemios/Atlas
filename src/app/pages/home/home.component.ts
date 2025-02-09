import { CourseInterface } from './../../interfaces/course-interface';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly connectionService: ConnectionService,
    private readonly coursesService: CoursesService,
  ) { }

  lastCourses: CourseInterface[] = [];
  backendStatusCode: number = 404;
  authStatusCode: number = 401;
  joinUsList = [
    {
      title: 'Conecta con Otros Juniors',
      description: 'Comparte tus experiencias y aprende de otros programadores como tú.',
      icon: 'chat-bubble-dots.svg',
      url: '/explore',
    },
    {
      title: 'Colabora en Proyectos',
      description: 'Elige proyectos en los que puedas aportar y que se adapten a tu nivel.',
      icon: 'git-merge.svg',
      url: '/projects',
    },
    {
      title: 'Sigue Aprendiendo',
      description: 'Accede a recursos y cursos para seguir desarrollando tus habilidades.',
      icon: 'chess-pawn.svg',
      url: '/learning',
    },
    {
      title: 'Abre Nuevas Oportunidades',
      description: 'Haz networking y consigue referencias que te ayuden en tu carrera.',
      icon: 'key.svg',
      url: '/explore',
    },
  ];

  ngOnInit(): void {
    this.lastCourses = this.coursesService.show();
    this.connectionService.subscribeToBackendResponse((response) => {
      this.backendStatusCode = response.statusCode
    });
    this.authService.subscribeToAuthResponse((response) => {
      this.authStatusCode = response.statusCode;
    });
  }
}
