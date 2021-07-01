import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// Model
import { ChildRegisterModel } from '../models/child-register.model';

@Injectable({
  providedIn: 'root'
})
export class ChildRegisterService {
  childList: AngularFireList<any>;
  private createdObject: any;
  currentImage: File;

  constructor(private firebase: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  getChild() {
    return this.firebase.list('children').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  setCurrentImage(image: any) {
    this.currentImage = image;
  }

  fileReference(fileName: string) {
    return this.storage.ref(fileName);
  }

  uploadPhoto(fileName: string, data: any) {
    return this.storage.upload(fileName, data);
  }

  chargePhoto(child: ChildRegisterModel, id: string) {
    let resp = false;
    this.uploadPhoto(`${child.firstName + id}`, child.imageFile);

    let reference = this.fileReference(`${child.firstName + id}`);
    reference.getDownloadURL().subscribe((url: any) => {
      child.image = url;
      this.updateChild(id, child);
      return true;
    });

  }

  createChild(child: ChildRegisterModel) {
    return this.firebase.list('children').push(child).key;
  }

  getChildbyId(id: string) {
    const ref = fb.database().ref('children');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  updateChild(id: string, child: ChildRegisterModel) {
    this.firebase.list('children').update(id, child);
  }

  getCreatedObject() {
    return this.createdObject;
  }

  setCreatedObject(createdObject: any) {
    this.createdObject = createdObject;
  }
}
