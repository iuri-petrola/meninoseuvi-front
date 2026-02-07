import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminMediaService } from '../../services/admin-media.service';

@Component({
  selector: 'app-admin-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.scss']
})
export class AdminUploadComponent {
  title = '';
  audioMimeType = 'audio/mpeg';
  audioBase64 = '';
  imageFile: File | null = null;
  loading = false;
  message = '';
  error = '';

  constructor(
    private mediaService: AdminMediaService,
    private auth: AdminAuthService,
    private router: Router
  ) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  submit() {
    this.message = '';
    this.error = '';

    if (!this.imageFile) {
      this.error = 'Selecione uma imagem.';
      return;
    }

    this.loading = true;

    this.mediaService
      .create({
        title: this.title,
        audioBase64: this.audioBase64,
        audioMimeType: this.audioMimeType,
        imageFile: this.imageFile
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.message = 'Midia enviada com sucesso.';
          this.title = '';
          this.audioBase64 = '';
          this.imageFile = null;
        },
        error: () => {
          this.loading = false;
          this.error = 'Erro ao enviar midia.';
        }
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
