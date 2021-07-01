import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthentificationService {

  private user: Observable<firebase.User>;
  loginSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());

  constructor(private fAuth: AngularFireAuth, private router: Router) {
    this.user = fAuth.authState;
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  public loginWhitEmail(value): Promise<void> {
    return this.fAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(res => {
      this.loginSubject.next(true);
      localStorage.setItem('user', JSON.stringify(this.fAuth.auth.currentUser));
    });
  }

  public logout(): void {
    this.loginSubject.next(false);
    this.fAuth.auth.signOut().then((res) => this.router.navigate(['/home']));
    localStorage.clear();
  }

  public registerUser(value): Promise<unknown> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  public editEmail(value): void {
    firebase.auth().currentUser.updateEmail(value.email);
  }

  public getUser(): Observable<firebase.User> {
    return this.fAuth.authState.pipe(first());
  }
}
