import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import firebase from 'firebase/app';
import 'firebase/auth';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { user } from '../user-type';
import { character } from '../character-type';
import { CharacterService } from '../character.service';

// Thanks so much to Jeff Delany for the Google Auth tutorial!
// https://fireship.io/lessons/angularfire-google-oauth/

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<user>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
    ) { 
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<user>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
    }
  
  provider = new firebase.auth.GoogleAuthProvider();
  
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(this.provider);
    this.router.navigateByUrl('/dashboard')
    let characters: character[]
    this.user$.subscribe(user => {
      this.afs.doc<user>(`users/${user.uid}`).valueChanges().subscribe(
        ref => characters = ref.characters)
      if (characters !== undefined || characters !== []) {
        user = {
          ...credential.user,
          characters: characters
        }
      }
      else {
        user = {
          ...credential.user,
          characters: []
        }
      }
      return this.updateUserData(user);
    })
    
  }

  private updateUserData(user: user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<user> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      characters: user.characters
    } 

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

}