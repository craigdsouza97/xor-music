import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 

  constructor(private authservice:AuthService,private db:AngularFireDatabase,private router:Router) { 
    
  }
   email:string;
   name:string;
   password:string;
  
   userId:string;


  ngOnInit() {
   
  }

  signupUser(name:HTMLInputElement,email:HTMLInputElement,password:HTMLInputElement){
    this.name=name.value;
    this.email = email.value;
    this.password=password.value;
    this.authservice.signUpUser(this.name,this.email,this.password);
    
  }






}
