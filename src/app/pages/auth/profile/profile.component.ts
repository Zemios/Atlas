import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: any;
  constructor(private authService: AuthService) {
    this.authService.getActualUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
