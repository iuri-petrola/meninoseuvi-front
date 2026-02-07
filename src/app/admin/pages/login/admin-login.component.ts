import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  name = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AdminAuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.loading = true;

    this.auth.login(this.name, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/admin/upload');
      },
      error: () => {
        this.loading = false;
        this.error = 'Login invalido';
      }
    });
  }
}
