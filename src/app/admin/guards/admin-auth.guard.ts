import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    sessionStorage.setItem('mev_admin_expired', '1');
    router.navigateByUrl('/admin/login');
    return false;
  }

  return true;
};
