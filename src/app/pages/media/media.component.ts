import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../services/media.service';
import { MediaItem } from '../../models/media-item';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  private readonly mediaService = inject(MediaService);

  readonly media$ = this.mediaService.list();

  audioSrc(item: MediaItem): string {
    return `data:${item.audioMimeType};base64,${item.audioBase64}`;
  }
}
