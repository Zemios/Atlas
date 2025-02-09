import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionService } from './services/connection.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { backendResponseInterface } from './interfaces/response-interface';



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
  backendResponse: backendResponseInterface = {
    statusCode: 404,
    message: 'Not Found',
  };
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
    if (this.backendResponse.statusCode == 200) {
      this.authService.getActualUser().subscribe({
        next: () => {
          this.authService.checkAuth().subscribe({})
          this.authService.refreshToken().subscribe({})
        },
        error: (err) => {
          console.error('Actual user not found', err);
        }
      })
    }
  }

  checkConnection(): void {
    this.connectionService.checkBackendConnection().subscribe({
      next: () => {
        this.connectionService.subscribeToBackendResponse((response) => {
          this.backendResponse = response;
        })
      },
      error: (err) => {
        this.backendResponse.statusCode = 404;
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

  logout() {
    throw new Error('Method not implemented.');
  }
}
