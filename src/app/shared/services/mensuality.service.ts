import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import * as fb from 'firebase';

import { MensualityModel } from '../models/mensuality.model';

@Injectable({
  providedIn: 'root'
})
export class MensualityService {
  mensualityList: AngularFireList<any>;
  childKey: any;


  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  getMensualities() {
    return this.firebase.list('mensualities').snapshotChanges().pipe(
      map(action => action.map(data => {
        return {
          key: data.payload.key,
          ...data.payload.val()
        };
      })));
  }

  createMensuality(mensuality: MensualityModel) {
    return this.firebase.list('mensualities').push(mensuality).key;
  }

  getMensualitybyId(id: string) {
    const ref = fb.database().ref('mensualities');
    return ref.child(id).once('value').then((snapshot) => snapshot.val());
  }

  setMensuality( childKey: any) {
    this.childKey = childKey;
  }

  getChildKey() {
    return this.childKey;
  }

}
