import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BioComponent } from './pages/bio/bio.component';
import { MediaComponent } from './pages/media/media.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bio', component: BioComponent },
  { path: 'media', component: MediaComponent },
  { path: 'contato', component: ContatoComponent },
  { path: '**', component: NotFoundComponent }
];
