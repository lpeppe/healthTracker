import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public authService: AuthService, public db: AngularFirestore) { }

  getExamNames() {
    return this.authService.afAuth.user
      .pipe(
        switchMap(user => this.db.collection(user.uid).snapshotChanges()),
        map(x => x.map(y => y.payload.doc.id))
      )
  }
}
