import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

import { ProfileModel } from '../models/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  childList: AngularFireList<any>;
  private createdObject: any;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  public getProfile(): Observable<any[]> {
    return this.firebase.list('profiles').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public createProfile(profile: ProfileModel, id: any): void {
    this.firebase.list('profiles').update(id, profile);
  }

  public getProfilebyId(id: string): Promise<any> {
    const ref = fb.database().ref('profiles');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  public updateProfile(id: string, profile: ProfileModel): void {
    this.firebase.list('profiles').update(id, profile);
  }

  public getProfileObject() {
    return this.createdObject;
  }

  public setProfileObject(createdObject: any): void {
    this.createdObject = createdObject;
  }

}
