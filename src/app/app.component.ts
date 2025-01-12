import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionService } from './services/connection.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, FooterComponent, RouterOutlet, TranslateModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService
  ) { }
  backendStatus: boolean = false;

  ngOnInit(): void {
    this.checkConnection();

    this.authService.refreshToken().subscribe({
      next: (response) => {
        console.log('Token refreshed successfully', response);
      },
      error: (error) => {
        console.error('Error refreshing token', error);
      },
    });
    this.authService.getActualUser().subscribe({
      next: (user) => {
        if (user) {
          console.log('Usuario cargado desde la cookie JWT:', user);
        } else {
          console.log('No se ha encontrado un usuario autenticado al recargar.');
        }
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    });
  }

  checkConnection(): void {
    this.connectionService.checkBackendConnection().subscribe({
      next: (response) => {
        this.backendStatus = response.isConnected;
        if (!this.backendStatus) {
          this.filterPages();
        }
      },
      error: (err) => {
        this.backendStatus = false;
        this.filterPages();
        console.error('Error al conectar con el backend:', err);
      },
    });
  }
  title = 'Zemios';

  filterPages(): void {
    if (!this.backendStatus) {
      this.pages = this.pages.filter((page) => page.title !== 'Foro' && page.title !== 'Proyectos' && page.title !== 'Noticias' && page.title !== 'Cursos');
    }
  }
  pages = [
    {
      title: 'Inicio',
      url: '',
      icon: 'house-fill',
    },
    // {
    //   title: 'Noticias',
    //   url: 'news',
    //   icon: 'newspaper',
    // },
    {
      title: 'Foro',
      url: 'explore',
      icon: 'chat-dots-fill',
    },
    /*     {
          title: 'Cursos',
          url: 'learning',
          icon: 'book-half'
        }, */
    {
      title: 'Proyectos',
      url: 'projects',
      icon: 'box-fill',
    },
    {
      title: 'Contacto',
      url: 'contact',
      icon: 'info-circle-fill',
    },
  ];
}
