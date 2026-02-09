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
    .pipe(map((items) => this.pickSelection(items)));

  // Monta a URL em base64 para o player de audio.
  audioSrc(item: MediaItem): string {
    return `data:${item.audioMimeType};base64,${item.audioBase64}`;
  }

  // Seleciona um item com base no índice estável para o card seleçao do dia.
  private pickSelection(items: MediaItem[]): MediaItem | null {
    if (!items || items.length === 0) return null;

    const seed = this.dateSeedInTimeZone('America/Sao_Paulo');

    // A partir do número consistente diário, gera um índice estável para o dia inteiro.
    const hash = this.hashString(seed);
    const index = Math.abs(hash) % items.length;

    return items[index];
  }

  // Produz uma string da data atual no fuso America/Sao_Paulo no formato yyyy-mm-dd .
  private dateSeedInTimeZone(timeZone: string): string {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());

    const year = parts.find((p) => p.type === 'year')?.value ?? '0000';
    const month = parts.find((p) => p.type === 'month')?.value ?? '00';
    const day = parts.find((p) => p.type === 'day')?.value ?? '00';

    return `${year}-${month}-${day}`;
  }

  // transforma string da data atual em um número consistente.
  private hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) | 0;
    }
    return hash;
  }
}
