import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log({ email })
      this.loginService.loginUser({ email, password }).subscribe(
        (response) => {
          console.log('Usuario logueado con éxito:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
          this.loginError = 'Correo o contraseña incorrectos.';
        }
      );
    } else {
      console.log('Formulario inválido');
      this.loginError = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
