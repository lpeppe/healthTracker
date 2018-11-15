import { Platform } from '@ionic/angular';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  user: firebase.User;
  subscriptions: Subscription[];

  constructor(public afAuth: AngularFireAuth, public platform: Platform) {
    this.subscriptions = [];
    this.subscriptions.push(
      this.afAuth.authState
        .subscribe(data => this.user = data)
    );
  }

  login(): Promise<any> {
    if (this.platform.is("android") || this.platform.is("ios"))
      return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
