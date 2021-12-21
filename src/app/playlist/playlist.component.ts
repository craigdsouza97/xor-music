import { Component, OnInit, Input } from '@angular/core';
import { MusicService } from '../services/music.service';
import { SongService } from '../services/song.service';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})


export class PlaylistComponent implements OnInit {
  files:any=[]
  album:string
  userId:string
  _subscription:Subscription
  
  constructor(private musicService:MusicService,private songService:SongService, private db:AngularFireDatabase,private authservice:AuthService) { 
  

  this.songService.playerMethodCall$.subscribe((album)=>{
    this.album=album
    console.log("album subscribe in playlist: "+this.album);

    this.musicService.getFiles().subscribe(
      files=>{
        this.files=files;
        console.log("Files array from playlist: "+this.files)
      }
    )
    
  })

  this.musicService.getFiles().subscribe(
    files=>{
      this.files=files;
      console.log("Files array from playlist: "+this.files)
    }
  )
    
  }
  setItem(music){
    var index=this.files.indexOf(music)
    this.songService.setFiles(index,music)
    this.songService.changeSongMethod()
    
  }
  ngOnInit() {
    
    
  }

}
