import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CoursesInterface } from '../../interfaces/courses-interface';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { sharedDataInterface } from '../../interfaces/shared-data-interface';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sharedData: Signal<sharedDataInterface> = inject(ROUTER_OUTLET_DATA) as Signal<sharedDataInterface>;
  /* TODO: Las funciones getter se ejecutan demasiadas veces. Hay que ver si se puede hacer algo para que solo se ejecuten si detectan que el valor ha cambiado.
  Actualmente se actualizan un aproximado de 20 veces cada vez que se realiza una acción (Scroll, click, etc.) */
  get backendStatus(): boolean {
    return this.sharedData().backendResponse.status;
  }
  get isAuthenticated(): boolean {
    return this.sharedData().user.isAuthenticated;
  }
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

  constructor(
    private authService: AuthService
  ) { }

  private readonly coursesSvc = inject(CoursesService);
  lastCourses: Array<CoursesInterface> = this.coursesSvc.show();
}
