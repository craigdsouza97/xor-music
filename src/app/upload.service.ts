import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Upload} from 'src/app/upload';
import * as firebase from 'firebase';
import {AngularFireModule} from 'angularfire2';
//import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  file_url:string;
  userId:string;
  _subscription:Subscription;

  constructor( private af: AngularFireModule , private db: AngularFireDatabase,private authservice:AuthService) { }

  private basePath:string = '/uploads';
  uploads: Observable<Upload[]>;

  pushUpload(upload: Upload) {
    this.userId=this.authservice.userId;
    this._subscription = this.authservice.useridChange.subscribe((value) => { 
      this.userId = value; 
    });
    alert("userid from uploadtask: "+this.userId)
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${this.userId}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        //upload.url = uploadTask.snapshot.ref.getDownloadURL()
      uploadTask.snapshot.ref.getDownloadURL()
      .then( downloadUrl => {
        alert("downloadurl: "+downloadUrl)
        upload.song=downloadUrl
        alert("file url: "+upload.song)
        upload.name = upload.file.name
        alert("file name: "+upload.name)
        upload.albumart="https://lh3.googleusercontent.com/Gn6wLcsUIb5pvIs198A2ah9qBd1XJvdnnwmEfpxK9EhJuQ_P0jTUgDp2GPdC9OLUfPO9"
        upload.artist="unkown";
        upload.album="unknown";
        this.saveFileData(upload)
      })
      .catch( error => {
        console.log(error);
        //catch error here
      });
   
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    alert("file url from save file: "+upload.song)
    alert("userid from save file: "+this.userId)
    this.db.list(`${this.basePath}/${this.userId}`).push(upload);
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
