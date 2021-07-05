import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// Model
import { ChildRegisterModel } from '../models/child-register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildRegisterService {
  childList: AngularFireList<any>;
  private createdObject: any;
  currentImage: File;

  constructor(private firebase: AngularFireDatabase,
    private storage: AngularFireStorage) { }

    public getChild(): Observable<any[]> {
    return this.firebase.list('children').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public setCurrentImage(image: any) {
    this.currentImage = image;
  }

  public fileReference(fileName: string) {
    return this.storage.ref(fileName);
  }

  public uploadPhoto(fileName: string, data: any) {
    return this.storage.upload(fileName, data);
  }

  public chargePhoto(child: ChildRegisterModel, id: string): void {
    let resp = false;
    this.uploadPhoto(`${child.firstName + id}`, child.imageFile);

    let reference = this.fileReference(`${child.firstName + id}`);
    reference.getDownloadURL().subscribe((url: any) => {
      child.image = url;
      this.updateChild(id, child);
      return true;
    });

  }

  public createChild(child: ChildRegisterModel): string{
    return this.firebase.list('children').push(child).key;
  }

  public getChildbyId(id: string): Promise<any> {
    const ref = fb.database().ref('children');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  public updateChild(id: string, child: ChildRegisterModel): void {
    this.firebase.list('children').update(id, child);
  }

  public getRegisterObject() {
    return this.createdObject;
  }

  public setRegisterObject(createdObject: any) {
    this.createdObject = createdObject;
  }
}
