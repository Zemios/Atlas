import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectionService } from './services/connection.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { backendResponseInterface } from './interfaces/backend-status-interface';
import { sharedDataInterface } from './interfaces/shared-data-interface';



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
  sharedData: sharedDataInterface = {
    backendResponse: this.backendResponse,
    user: {
      isAuthenticated: this.isAuthenticated,
    },
  }
  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkConnection();
    if (this.backendResponse.status) {
      this.authService.getActualUser().subscribe({
        next: () => {
          this.authService.refreshToken().subscribe({})
          this.authService.subscribeToCurrentUser((user) => {
            this.sharedData.user.userData = user;
            if (user) {
              this.authService.checkAuth().subscribe({
                next: (response) => {
                  this.isAuthenticated = response.isAuthenticated;
                  this.sharedData.user.isAuthenticated = this.isAuthenticated;
                }
              })
            }
          })
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
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

  logout() {
    this.sharedData.user = {
      userData: undefined,
      isAuthenticated: false,
    }
  }
}
