import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  name = '';
  password = '';
  loading = false;
  error = '';
  info = '';

  constructor(
    private auth: AdminAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(() => {
      const expiredFlag = sessionStorage.getItem('mev_admin_expired');
      if (expiredFlag === '1') {
        this.info = 'Sessao expirada. Entre novamente.';
        sessionStorage.removeItem('mev_admin_expired');
      }
    });
  }

  submit() {
    this.error = '';
    this.info = '';
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
