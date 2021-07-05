import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import * as fb from 'firebase';

// Model
import { ChildMedicalRecordModel } from '../models/child-medical-record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildMedicalRecordService {
  childList: AngularFireList<any>;
  private medicalRecordObject: any;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  public getChildMedicalRecord(): Observable<any[]> {
    return this.firebase.list('childrenMedical').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  public createChildMedicalRecord(child: ChildMedicalRecordModel, id: any): void {
    this.firebase.list('childrenMedical').update(id, child);
}

  public getChildMedicalRecordbyId(id: string): Promise<void> {
    const ref = fb.database().ref('childrenMedical');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  public updateChildMedicalRecord(id: string, child: ChildMedicalRecordModel): void {
    this.firebase.list('childrenMedical').update(id, child);
  }

  public getMedicalRecordObject() {
    return this.medicalRecordObject;
  }

  public setMedicalRecordObject(medicalRecordObject: any): void {
    this.medicalRecordObject = medicalRecordObject;
  }
}
