import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// model
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  createUser(user: UserModel) {
    this.firebase.list('users').push(user);
  }

  getUser() {
    return this.firebase.list('users').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  getUserByID(id: string) {
    const ref = fb.database().ref('users');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  updateUser(id: string, user: UserModel) {
    this.firebase.list('users').update(id, user);
  }

  deleteUserById(id: string) {
    this.firebase.list('users').remove(id);
  }

}
