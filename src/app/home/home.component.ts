import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  play:boolean=false
  close:boolean=true
  userId:string
  private userDetail=[]
  userInfoList={}
  

  constructor(songService:SongService,private authservice:AuthService,db: AngularFireDatabase){
    songService.playerMethodCall$.subscribe((album)=>{
      this.play=true
    })
    this.userId=authservice.userId;
    db.list('Users/'+this.userId).snapshotChanges().subscribe(
      list=>{
        list.map(item=>{  
           this.userDetail.push(item.payload.val())
        })
      }
    )
    console.log(this.userDetail)
  }
  call(){
    this.close=!this.close
  }
  ngOnInit() {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  logout(){
    this.authservice.signOut();
  }

}
