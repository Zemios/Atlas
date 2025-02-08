import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionService } from './services/connection.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { backendResponse } from './interfaces/backend-status-interface';



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
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'Zemios';
  backendResponse: backendResponse = {
    status: false,
    message: '',
  };
  isAuthenticated: boolean = false;
  pages = [
    {
      title: 'Inicio',
      url: '',
      icon: 'house-fill',
    },
    {
      title: 'Contacto',
      url: 'contact',
      icon: 'info-circle-fill',
    },
  ];
  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkConnection();

    this.authService.refreshToken().subscribe({
      next: () => { },
      error: (error) => {
        console.error('Error refreshing token', error);
      },
    });
    this.authService.getActualUser().subscribe({
      next: (user) => {
        if (!user) {
          console.log('User authenticated not found');
        }
      },
      error: (error) => {
        console.error('Error loading an user:', error);
      },
    });
  }

  checkConnection(): void {
    this.connectionService.checkBackendConnection().subscribe({
      next: (response) => {
        this.backendResponse.status = response.isConnected;
        if (this.backendResponse) {
          this.filterPages();
        }
      },
      error: (err) => {
        this.backendResponse.status = false;
        console.error('Error connecting to backend:', err);
      },
    });
  }

  filterPages(): void {
    if (this.backendResponse) {
      this.pages = this.pages.concat(
        { title: 'Aprendizaje', url: 'learning', icon: 'mortarboard-fill' },
      )
    }
  }
}
