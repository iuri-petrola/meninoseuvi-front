import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BioComponent } from './pages/bio/bio.component';
import { MediaComponent } from './pages/media/media.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminLoginComponent } from './admin/pages/login/admin-login.component';
import { AdminUploadComponent } from './admin/pages/upload/admin-upload.component';
import { adminAuthGuard } from './admin/guards/admin-auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bio', component: BioComponent },
  { path: 'media', component: MediaComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/upload', component: AdminUploadComponent, canActivate: [adminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];
