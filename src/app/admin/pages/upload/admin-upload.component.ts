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
  audioFileName = '';
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

  onAudioChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;

    if (!file) {
      this.audioBase64 = '';
      this.audioFileName = '';
      return;
    }

    this.audioMimeType = file.type || 'audio/mpeg';
    this.audioFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const commaIndex = result.indexOf(',');
      this.audioBase64 = commaIndex >= 0 ? result.slice(commaIndex + 1) : result;
    };
    reader.readAsDataURL(file);
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
          this.audioFileName = '';
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
