import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, FooterComponent, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private connectionService: ConnectionService) { }
  backendStatus: boolean = false;

  ngOnInit(): void {
    this.checkConnection();
  }

  checkConnection(): void {
    this.connectionService.checkBackendConnection().subscribe({
      next: (response) => {
        this.backendStatus = true
        console.log('Conexión exitosa:', response);
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
    {
      title: 'Noticias',
      url: 'news',
      icon: 'newspaper',
    },
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
