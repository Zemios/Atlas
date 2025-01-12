import { IMAGES_URL } from './../../../app.config';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-publish',
  imports: [ReactiveFormsModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter();
  @Output() postCreatedEvent = new EventEmitter();
  actualUserImage: string | undefined;
  IMAGES_URL = IMAGES_URL;
  publishForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  submitted: boolean = false;
  placeholders: string[] = [
    '¿Qué tal van tus commits hoy?',
    'Cuéntanos algo interesante que aprendiste esta semana...',
    '¿Algún nuevo proyecto en el que estés trabajando?',
    '¿Has visto nuestros cursos?',
    '¿Por qué te encanta Zemios?',
    'Comparte algo que te inspire últimamente...',
    'Compartir algo es mejor que desplegar un viernes'
  ];
  placeholder: string = '';

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.publishForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe({
      next: (user) => {
        if (!user) {
          this.actualUserImage = undefined;
          console.error('User authenticated not found.');
          return;
        }
        this.actualUserImage = user.profile_picture;
      },
      error: (error) => {
        console.error(error);
      },
    })
    const randomIndex = Math.floor(Math.random() * this.placeholders.length);
    this.placeholder = this.placeholders[randomIndex];
  }
  closeModal() {
    this.closeModalEvent.emit();
  }

  sendPost() {
    this.submitted = true;

    if (this.publishForm.valid) {
      const post = this.publishForm.value;
      this.postsService.create(post).subscribe({
        next: () => {
          this.showSnackbar('Publicación creada con éxito', 'success');
          this.publishForm.reset();
          this.submitted = false;
          this.postCreatedEvent.emit();
          this.closeModal();
        },
        error: (error) => {
          console.log(error);
          this.showSnackbar('Error al crear la publicación', 'error');
        },
      });
    }
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    let config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['custom-snackbar', 'snackbar-success'] : ['custom-snackbar', 'snackbar-error'],
    };
    this._snackBar.open(message, '', config);
  }
}
