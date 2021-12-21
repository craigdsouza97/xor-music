import { Component, OnInit } from '@angular/core';
import { StreamState } from '../interfaces/stream-state';
import { AudioService } from '../services/audio.service';
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
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
state:StreamState;

states: string = 'default';

    

files: Array<any> = [];
currentFile:any={}
nextFile:any={}
prevFile:any={}

album:string
userId:string
_subscription:Subscription

constructor(private audioService: AudioService,private musicService: MusicService,private songService:SongService,private db:AngularFireDatabase,private authservice:AuthService) 
{
  this.songService.playerMethodCall$.subscribe((album)=>{
    this.album=album ;
    console.log("album subscribe in player: "+this.album);
    
    this.musicService.getFiles().subscribe(
      files=>{
        this.files=files;
        console.log("Files array from player: "+this.files)
      }
    )
  });
  
  this.musicService.getFiles().subscribe(
    files=>{
      this.files=files;
      console.log("Files array from player: "+this.files)
    }
  )
  

 
   
  //console.log(this.files[0].song)
  this.audioService.getState().subscribe(state=>this.state=state)
  this.songService.playerMethodCalled$.subscribe((files)=>{
    var index=files.index
    var file=files.file
    this.currentFile={index,file}
    this.playStream(file.song);
    index = ((this.currentFile.index - 1)+this.files.length)%this.files.length;
    file = this.files[index];
    this.prevFile={index,file}
    index = (this.currentFile.index + 1)%this.files.length;
    file = this.files[index%this.files.length];
    this.nextFile={index,file}
  })
  this.openFile(this.files[0],0)
  this.nextFile=this.getFile(this.files[1],1)
  this.prevFile=this.getFile(this.files[this.files.length-1],this.files.length-1)

}

ngOnInit() { 
  
  
}

  playStream(url){
    this.audioService.playStream(url).subscribe(events=>{
    })
  }

  getFile(file,index){
    return {index,file}
  }
  
  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.song);
  }
  pause_play() {
    if(this.state.playing)
      this.audioService.pause();
    else
      this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.audioService.stop();
    this.prevFile=this.currentFile;
    const index = (this.currentFile.index + 2)%this.files.length;
    const file = this.files[index%this.files.length];
    this.currentFile=this.nextFile
    this.playStream(this.currentFile.file.song);
    this.nextFile = {index,file};
  }

  previous() {
    this.audioService.stop();
    this.nextFile = this.currentFile;
    const index = ((this.currentFile.index - 2)+this.files.length)%this.files.length;
    const file = this.files[index];
    this.currentFile=this.prevFile;
    this.playStream(this.currentFile.file.song);
    this.prevFile={index,file};
    
  }
  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
  

}
