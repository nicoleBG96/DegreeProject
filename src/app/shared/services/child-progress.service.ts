import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// Model
import { ChildProgressModel } from '../models/child-progress.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildProgressService {
  childList: AngularFireList<any>;
  private progressObject: any;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  public getChildProgress(): Observable<any[]> {
    return this.firebase.list('childrenProgress').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public createChildProgress(child: ChildProgressModel, id: any): void {
    this.firebase.list('childrenProgress').update(id, child);
  }

  public getChildProgressbyId(id: string): Promise<void> {
    const ref = fb.database().ref('childrenProgress');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  public updateChildProgress(id: string, child: ChildProgressModel): void{
    this.firebase.list('childrenProgress').update(id, child);
  }

  public getProgressObject() {
    return this.progressObject;
  }

  public setProgressObject(progressObject: any) {
    this.progressObject = progressObject;
  }
}
