import { Component, OnInit } from '@angular/core';
import {Upload} from 'src/app/upload'
import {UploadService} from 'src/app/upload.service'
import { AuthService } from '../auth.service';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import {AngularFireModule} from 'angularfire2';
import { AdminuploadService } from '../adminupload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
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

  

  constructor(private upSvc: UploadService,private authservice:AuthService,private db:AngularFireDatabase,private af: AngularFireModule) { 
    
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
   // alert(this.selectedoption)
    this.db.list(`${this.basePath}/${this.userId}`).snapshotChanges()
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
    this.upSvc.pushUpload(this.currentUpload)
    }
  }

}
