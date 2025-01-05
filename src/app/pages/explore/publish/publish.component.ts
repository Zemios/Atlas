import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-publish',
  imports: [ReactiveFormsModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  @Output() closeModalEvent = new EventEmitter();
  publishForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private postsService: PostsService, private _snackBar: MatSnackBar) {
    this.publishForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  sendPost() {
    if (this.publishForm.valid) {
      const post = this.publishForm.value;
      this.postsService.create(post).subscribe({
        next: () => {
          this.showSnackbar('Publicación creada con éxito', 'success');
          this.publishForm.reset();
          this.closeModal();
        },
        error: () => {
          this.showSnackbar('Error al crear la publicación', 'error');
        },
      });
    }
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    let config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['custom-snackbar', 'snackbar-success'] : ['custom-snackbar', 'snackbar-error'],
    };
    const snackbarRef = this._snackBar.open(message, '', config);

    snackbarRef.afterOpened().subscribe(() => {
      const snackBarContainer = document.querySelector('.custom-snackbar');
      if (snackBarContainer) {
        const closeButton = document.createElement('button');
        closeButton.innerHTML = `<i class="bi bi-x-circle-fill snackbar-close-icon"></i>`;
        closeButton.onclick = () => snackbarRef.dismiss();
        snackBarContainer.appendChild(closeButton);
      }
    });
  }
}
