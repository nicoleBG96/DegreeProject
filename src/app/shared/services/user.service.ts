import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// model
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  createUser(user: UserModel) {
    this.firebase.list('users').push(user);
  }

  public getUser(): Observable<any[]> {
    return this.firebase.list('users').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public getUserByID(id: string): Promise<any> {
    const ref = fb.database().ref('users');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  public updateUser(id: string, user: UserModel): void {
    this.firebase.list('users').update(id, user);
  }

  public deleteUserById(id: string): void {
    this.firebase.list('users').remove(id);
  }

}
