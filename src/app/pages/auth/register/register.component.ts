import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  createAccount(event: Event) {
    event.preventDefault();

    if (this.registerForm.valid) {
      const { password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return;
      } else {
        this.passwordMismatch = false;
      }

      const user = {
        name: this.registerForm.value.name.trim(),
        email: this.registerForm.value.email.trim(),
        password: this.registerForm.value.password.trim(),
      };

      this.registerService.registerUser(user).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
