import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CoursesInterface } from '../../interfaces/courses-interface';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionService } from '../../services/connection.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  joinUsList = [
    {
      title: 'Únete a la Comunidad',
      description: 'Regístrate en nuestra plataforma y crea tu perfil.',
      icon: 'group.svg',
      url: '/register',
    },
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

  isAuthenticated: boolean = false;
  backendStatus: boolean = false;

  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkConnection();
    this.checkUserAuth();
    if (!this.backendStatus || this.isAuthenticated) {
      this.joinUsList.shift();
    }
  }

  checkConnection(): void {
    this.connectionService.checkBackendConnection().subscribe({
      next: (response) => {
        this.backendStatus = response.isConnected;
      },
      error: () => {
        this.backendStatus = false;
      },
    });
  }

  checkUserAuth(): void {
    this.authService.checkAuth().subscribe({
      next: (response) => {
        this.isAuthenticated = response.isAuthenticated;
      },
      error: (err) => {
        console.error('Error checking auth', err);
        this.isAuthenticated = false;
      },
    });
  }

  private readonly coursesSvc = inject(CoursesService);
  lastCourses: Array<CoursesInterface> = this.coursesSvc.show();
}
