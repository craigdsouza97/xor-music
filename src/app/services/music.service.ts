import { Injectable } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { SongService } from '../services/song.service';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private album:string="International";
  private userId:string;
  private _subscription:Subscription


  constructor(private songService:SongService, private authservice:AuthService, private db:AngularFireDatabase) { }
  
  files:any=[];
  
  getFiles() {
     this.songService.playerMethodCall$.subscribe((album)=>{
      this.album=album;
      console.log("album subscribe in music service in: "+this.album);
      
    }) 
    
    //this.files=[];
    //this.files=this.files.splice(0,this.files.length)
    this.userId=this.authservice.userId;
    this._subscription = this.authservice.useridChange.subscribe((value) => { 
      this.userId = value; 
    });
    if(this.album=="YourSongs"){
      this.db.list('uploads/'+this.userId).snapshotChanges().subscribe(
        list=>{
          this.files=list.map(item=>{
            return {
              $key:item.key,
              ...item.payload.val()
            }
          })
        }
      )
    }else{
      this.db.list(`${this.album}`).snapshotChanges().subscribe(
        list=>{
          this.files=list.map(item=>{
            return {
              $key:item.key,
              ...item.payload.val()
            }
          })
        }
      )
    } 
    console.log("album from const of music service out: "+this.album)
    console.log("files array from music service: "+this.files) 
    return of(this.files);
    
  }
}
