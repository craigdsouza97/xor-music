import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 flag = 1;
  constructor(private router:Router,private authservice:AuthService) { }

  email:string;
  password:string;

  ngOnInit() {
  }

 
  gotoSignup(){
    this.router.navigate(['/signup']);
  }

  loginUser(email:HTMLInputElement,password:HTMLInputElement){
    this.authservice.signInUser(email.value,password.value)
    
    
  }

}
