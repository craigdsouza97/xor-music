import { Component, OnInit } from '@angular/core';
import {Upload} from 'src/app/upload'
import {UploadService} from 'src/app/upload.service'
import { AuthService } from '../auth.service';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import {AngularFireModule} from 'angularfire2';
import { AdminuploadService } from '../adminupload.service';



@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  
  selectedFiles: FileList;
  currentUpload: Upload;

  userId:string;
  _subscription:Subscription;
  private basePath:string = '/uploads';
  playlist=[];

  selectedoption:string
  songname:string
  songart:string
  songimg:string

  

  constructor(private upSvc: AdminuploadService,private authservice:AuthService,private db:AngularFireDatabase,private af: AngularFireModule) { 
    
  }

  ngOnInit(){

    this.userId=this.authservice.userId;
    this._subscription = this.authservice.useridChange.subscribe((value) => { 
      this.userId = value; 
    });
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    alert(this.selectedoption)
    this.db.list(`${this.selectedoption}`).snapshotChanges()
    .subscribe(
      list=>{
        this.playlist=list.map(item=>{
          return {
            $key : item.key,
            ...item.payload.val()
          }
        })
      }
      
    )
    //console.log("pl from init:"+this.playlist)
    if(this.selectedFiles){
      let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.selectedoption,this.songname,this.songimg,this.songart)
    }
  }



  
}
