import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  childList: AngularFireList<any>;
  private createdObject: any;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  getProfile() {
    return this.firebase.list('profiles').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  createProfile(profile: ProfileModel, id: any) {
    this.firebase.list('profiles').update(id, profile);
  }

  getProfilebyId(id: string) {
    const ref = fb.database().ref('profiles');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  updateProfile(id: string, profile: ProfileModel) {
    this.firebase.list('profiles').update(id, profile);
  }

  getCreatedObject() {
    return this.createdObject;
  }

  setCreatedObject(createdObject: any) {
    this.createdObject = createdObject;
  }

}
