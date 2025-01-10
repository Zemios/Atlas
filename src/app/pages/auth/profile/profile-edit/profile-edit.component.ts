import { IMAGES_URL } from './../../../../app.config';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';
import { UserInterface } from '../../../../interfaces/user-interface';

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  IMAGES_URL = IMAGES_URL;
  updated_profile_picture: string = '';

  @Input() user: UserInterface | undefined;
  @Output() close = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      title: ['', [Validators.maxLength(255)]],
      about_me: ['', [Validators.maxLength(500)]],
      profile_picture: [''],
    });
  }

  ngOnInit(): void {
    this.authService.getActualUser().subscribe((user) => {
      this.user = user;
      this.profileForm.patchValue({
        name: this.user.name,
        title: this.user.title || '',
        about_me: this.user.about_me || '',
      });
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  updateProfile() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    const updatedProfile = { ...this.profileForm.value };

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profile_picture', this.selectedFile);
    }

    this.usersService.update(updatedProfile).subscribe({
      next: () => {
        this.showSnackbar('Perfil actualizado con éxito', 'success');
        this.submitted = false;
      },
      error: (error) => {
        console.error(error);
        this.showSnackbar('Error al actualizar el perfil', 'error');
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        if (this.user) {
          this.updated_profile_picture = reader.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  closeModal() {
    this.close.emit();
  }

  removeProfilePicture(): void {
    if (this.user) {
      this.user.profile_picture = undefined;
      this.profileForm.patchValue({
        profile_picture: null,
      });
      this.selectedFile = null;
    }
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }
}
