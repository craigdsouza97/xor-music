import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private db:AngularFireDatabase,private router:Router) { }

  token:string;
  userId:string;
  useridChange: Subject<string> = new Subject<string>();


  signUpUser(name:string,email:string,password: string){
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((result) => {
      this.userId=result.user.uid;
      this.useridChange.next(this.userId);
      alert("userid from service: "+result.user.uid);
      this.db.list('Users/').update(this.userId,{'userid':this.userId,'name':name,'email':email})
      this.router.navigate(['/home']);
    })
    .catch(
      error=>console.log(error)  
    )
  }


  signInUser(email:string,password: string){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(
      respons=>{
        firebase.auth().currentUser.getIdToken()
        .then(
          (token:string)=>{
            this.token=token;
            alert(this.token);
            this.router.navigate(['/home']);
          }
          
        )
      }
      
    )
    .catch(
     
      error=>{
        console.log(error);
        alert("not valid user")
      }
    )
    this.userId=firebase.auth().currentUser.uid;
    
  }

  signOut() {
     firebase.auth().signOut().then(() => {
      //this.router.navigate(['/login']);
      console.log("user logged out")
    })
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
    .then(
      (token:string)=>this.token=token
    );
    return this.token;
  }










}