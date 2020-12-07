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
      private character: CharacterService
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
  
  subscription: any;
  
  provider = new firebase.auth.GoogleAuthProvider();
  
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(this.provider);
    
    this.subscription = this.user$.subscribe(user => {
      let userObj: user
      if (user) {
        this.afs.doc<user>(`users/${user.uid}`).valueChanges().subscribe(ref => {
          userObj = {
            displayName: credential.user.displayName,
            uid: credential.user.uid,
            email: credential.user.email,
            photoURL: credential.user.photoURL,
            characters: ref.characters
        }
        this.updateUserData(userObj);
      })
      } else { // New user?
        console.log("Bad user, creating new?")
        this.updateUserData({
          displayName: credential.user.displayName,
          uid: credential.user.uid,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
          characters: [this.character.newDefaultCharacter()]
        })
      }
    })
    this.router.navigateByUrl('/dashboard')
    
  }

  private updateUserData(user: user) {
    // Sets user data to firestore on login
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      characters: user.characters
    } 
    
    console.log('updateUserData', data)
    const userRef: AngularFirestoreDocument<user> = this.afs.doc(`users/${data.uid}`);
    
    userRef.set(data, { merge: true })
    
    this.subscription.unsubscribe()
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

}