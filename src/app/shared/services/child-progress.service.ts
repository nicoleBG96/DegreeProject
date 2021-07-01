import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// Model
import { ChildProgressModel } from '../models/child-progress.model';

@Injectable({
  providedIn: 'root'
})
export class ChildProgressService {
  childList: AngularFireList<any>;
  private createdObject: any;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  getChildProgress() {
    return this.firebase.list('childrenProgress').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  createChildProgress(child: ChildProgressModel, id: any) {
    this.firebase.list('childrenProgress').update(id, child);
  }

  getChildProgressbyId(id: string) {
    const ref = fb.database().ref('childrenProgress');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  updateChildProgress(id: string, child: ChildProgressModel) {
    this.firebase.list('childrenProgress').update(id, child);
  }

  getCreatedObject() {
    return this.createdObject;
  }

  setCreatedObject(createdObject: any) {
    this.createdObject = createdObject;
  }
}
