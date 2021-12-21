import { Injectable } from '@angular/core';
import { Subject, of, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class SongService {


  
  files:any=[]
  private changeSong=new Subject<any>()
  playerMethodCalled$=this.changeSong.asObservable();
  private setPlayer=new Subject<any>()
  playerMethodCall$=this.setPlayer.asObservable();
  album:string;
  userId:string
  _subscription:Subscription

  constructor(private songService: SongService,private authservice:AuthService, private db:AngularFireDatabase) { }

  setFiles(index,file){
    this.files={index,file}
  }
  getFiles(){
    /* this.songService.playerMethodCall$.subscribe((album)=>{
      this.album=album
      console.log("in player const from song service: "+this.album)
    })  */
   // this.files=[];
   //this.files=this.files.splice(0,this.files.length)
   console.log("in player const from song service: "+this.album)
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
    console.log("files array frm song service: "+this.files) 
    return of(this.files)
  }
  changeSongMethod(){
    this.changeSong.next(this.files);
  }
  albumClicked(album){

    this.setPlayer.next(album);
  }
  
}
