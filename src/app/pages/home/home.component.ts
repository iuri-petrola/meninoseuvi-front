import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MediaService } from '../../services/media.service';
import { MediaItem } from '../../models/media-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  private readonly mediaService = inject(MediaService);

  readonly selection$: Observable<MediaItem | null> = this.mediaService
    .list()
    .pipe(map((items) => this.pickRandomSelection(items)));

  audioSrc(item: MediaItem): string {
    return `data:${item.audioMimeType};base64,${item.audioBase64}`;
  }

  private pickRandomSelection(items: MediaItem[]): MediaItem | null {
    if (!items || items.length === 0) return null;

    const index = Math.floor(Math.random() * items.length);

    return items[index];
  }
}
