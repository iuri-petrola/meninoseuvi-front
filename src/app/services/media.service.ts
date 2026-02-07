import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaItem } from '../models/media-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {}

  list(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${environment.apiBaseUrl}/api/media`);
  }
}
