import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../../../interfaces/user-interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
  providers: [],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  profileForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(50)]],
      title: [this.data.title, [Validators.required, Validators.maxLength(50)]],
      about_me: [this.data.about_me, [Validators.maxLength(280)]],
      photo: [null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value); // Envía los datos del formulario al cerrar
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({
        photo: file
      });
    }
  }
}
