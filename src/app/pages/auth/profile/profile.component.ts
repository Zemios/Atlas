import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../interfaces/user-interface';
import { UsersService } from '../../../services/users.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { Router } from '@angular/router';
import { IMAGES_URL } from '../../../app.config';

@Component({
  selector: 'app-profile',
  imports: [ProfileEditComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: UserInterface | null = null;
  profileEditModal = false;
  IMAGES_URL = IMAGES_URL;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe({
      next: (user) => {
        if (!user) {
          console.error('User authenticated not found.');
          return;
        }
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  toggleProfileEditModal() {
    this.profileEditModal = !this.profileEditModal;
  }

  saveProfileEdit() {
    this.profileEditModal = false;
    this.authService.currentUser.subscribe({
      next: (user) => {
        if (!user) {
          console.error('User authenticated not found.');
          this.user = null;
          return;
        }
        this.user = user
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  closeProfileEditModal() {
    this.profileEditModal = false;
  }

  openProfileEditModal() {
    if (this.user) {
      this.profileEditModal = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
