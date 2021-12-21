import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';
import { LoginComponent } from './login/login.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {PlayerComponent} from './player/player.component';
import {PlaylistComponent} from './playlist/playlist.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadService } from './upload.service';
import {AngularFireUploadTask } from '@angular/fire/storage';
import { AlbumsComponent } from './albums/albums.component';
import { DragDirective } from './dragdrop.directive';
import { UploadComponent } from './upload/upload.component';
import { AdminuploadService } from './adminupload.service';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    LoginComponent,
    PlayerComponent,
    PlaylistComponent,
    SignupComponent,
    UploadFormComponent,
    AlbumsComponent,
    DragDirective,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollToModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireDatabaseModule,
   AngularFireAuthModule,
   AngularFireModule,
   BrowserAnimationsModule,
   FormsModule
  ],
  providers: [AuthService,UploadService,AdminuploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
