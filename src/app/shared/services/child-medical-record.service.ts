import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// Model
import { ChildMedicalRecordModel } from '../models/child-medical-record.model';

@Injectable({
  providedIn: 'root'
})
export class ChildMedicalRecordService {
  childList: AngularFireList<any>;
  private createdObject: any;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  getChildMedicalRecord() {
    return this.firebase.list('childrenMedical').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  createChildMedicalRecord(child: ChildMedicalRecordModel, id: any) {
    this.firebase.list('childrenMedical').update(id, child);
}

  getChildMedicalRecordbyId(id: string) {
    const ref = fb.database().ref('childrenMedical');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  updateChildMedicalRecord(id: string, child: ChildMedicalRecordModel) {
    this.firebase.list('childrenMedical').update(id, child);
  }

  getCreatedObject() {
    return this.createdObject;
  }

  setCreatedObject(createdObject: any) {
    this.createdObject = createdObject;
  }
}
