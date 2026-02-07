import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type MediaPayload = {
  title: string;
  audioBase64: string;
  audioMimeType: string;
  imageFile: File;
};

@Injectable({
  providedIn: 'root'
})
export class AdminMediaService {
  constructor(private http: HttpClient) {}

  create(payload: MediaPayload): Observable<unknown> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('audioBase64', payload.audioBase64);
    formData.append('audioMimeType', payload.audioMimeType);
    formData.append('image', payload.imageFile);

    return this.http.post(`${environment.apiBaseUrl}/api/media`, formData);
  }
}
