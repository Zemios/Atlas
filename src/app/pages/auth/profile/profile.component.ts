import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserInterface } from '../../../interfaces/user-interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  imports: [MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: UserInterface = new Object() as UserInterface;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private usersService: UsersService
  ) {
    this.authService.getActualUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      width: '400px',
      data: { ...this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedUser = { ...this.user, ...result };
        this.usersService.update(this.user.id, updatedUser).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }
}
