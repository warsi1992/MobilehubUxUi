import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

   this.authService.login({
  email: this.loginForm.get('email')!.value!,
  password: this.loginForm.get('password')!.value!
})
.subscribe({
  next: (res) => {
    debugger;
    localStorage.setItem('token', res.token);
  localStorage.setItem('userId', res.userId.toString());
  localStorage.setItem('firstName', res.firstName);
  localStorage.setItem('role', res.role);
    this.toastr.success('Login successful');
   if (res.role === 'Admin') {
  this.router.navigate(['/admin/dashboard']);
} else {
  this.router.navigate(['/']);
}
  },
  error: () => {
    this.toastr.error('Invalid email or password');
  }
});
  }

}