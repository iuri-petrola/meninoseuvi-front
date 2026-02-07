import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminLoginResponse } from '../models/admin-login-response';

const TOKEN_KEY = 'mev_admin_token';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<AdminLoginResponse> {
    return this.http
      .post<AdminLoginResponse>(`${environment.apiBaseUrl}/admin/login`, { name, password })
      .pipe(tap((res) => this.setToken(res.token)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
