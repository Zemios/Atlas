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
  updated_profile_picture: string | undefined;

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
      name: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
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
    this.profileForm.get('name')?.valueChanges.subscribe(value => {
      if (value) {
        const transformedValue = value.replace(/\s+/g, '');
        this.profileForm.get('name')?.setValue(transformedValue, { emitEvent: false });
      }
    });
  }

  formData = new FormData();
  updateProfile() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      const name: string | null = this.profileForm.get('name')?.value;
      const title: string | null = this.profileForm.get('title')?.value;
      const about_me: string | null = this.profileForm.get('about_me')?.value;

      if (this.profileForm.get('name')?.invalid) {
        console.log(name)
        if (name?.replace('/\s+/g', '') == '') {
          this.showSnackbar('Nombre no puede estar vacio', 'error')
          return
        } else if (name) {
          if (name.length > 255) {
            this.showSnackbar('Nombre no puede tener mas de 255 caracteres', 'error')
            return
          }
        }
        this.showSnackbar('Error en el campo "Nombre"', 'error')
        return
      }

      if (this.profileForm.get('title')?.invalid) {
        if (title) {
          if (title.length > 255) {
            this.showSnackbar('Título no puede tener mas de 255 caracteres', 'error')
            return
          }
        }
        this.showSnackbar('Error en el campo "Título"', 'error')
        return
      }

      if (this.profileForm.get('about_me')?.invalid) {
        if (about_me) {
          if (about_me.length > 500) {
            this.showSnackbar('Descripción no puede tener mas de 500 caracteres', 'error')
            return
          }
        }
        this.showSnackbar('Error en el campo "Descripción"', 'error')
        return
      }

      this.showSnackbar('Error en los campos del formulario', 'error')
      return;
    }

    this.formData = new FormData();

    Object.keys(this.profileForm.value).forEach(key => {
      const value = this.profileForm.value[key];
      if (value !== null && value !== '' && key !== 'profile_picture') {
        this.formData.append(key, value);
      }
    });

    if (this.selectedFile) {
      this.formData.append('profile_picture', this.selectedFile);
    }

    this.usersService.update(this.formData).subscribe({
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
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSizeInMB = 2;
      if (!allowedTypes.includes(file.type)) {
        this.showSnackbar('Formato de archivo no permitido', 'error');
        return
      }
      if (file.size > maxSizeInMB * 1024 * 1024) {
        this.showSnackbar('El archivo es demasiado grande', 'error');
        return
      }

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
      this.formData.append('profile_picture', '');
      this.user.profile_picture = undefined;
      this.updated_profile_picture = undefined;
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
      panelClass: type === 'success' ? ['custom-snackbar', 'snackbar-success'] : ['custom-snackbar', 'snackbar-error'],
    });
  }
}
