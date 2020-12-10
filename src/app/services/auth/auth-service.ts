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
import { isDeepStrictEqual } from 'util';

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
  
  provider = new firebase.auth.GoogleAuthProvider();
  userData: any;

  
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(this.provider);
    const userRef = this.afs.collection('users').doc(`${credential.user.uid}`);
    const doc = await userRef.ref.get();
    
    if (!doc.exists) {
      // console.log('New User!');
        this.updateUserData({
          displayName: credential.user.displayName,
          uid: credential.user.uid,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
          characters: [this.character.newDefaultCharacter()]
      })
    } else {
       this.userData = doc.data()
      // console.log('Existing User!', this.userData);
    }
    localStorage.setItem("uid", String(credential.user.uid))
    
    this.router.navigateByUrl('/dashboard')
  }
  
  async getUserCharacterData(): Promise<character[]> {
    const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
    const doc = await userRef.ref.get();
    if (!doc.exists) {
      this.router.navigate(['login'])
    }
    else {
      let ret: any = doc.data()
      return ret.characters
    }
  }

  updateUserData(user: user) {
    // Sets user data to firestore on login
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      characters: user.characters
    } 
    
    const userRef: AngularFirestoreDocument<user> = this.afs.doc(`users/${data.uid}`);
    
    console.log('Updating user data')
    userRef.set(data, { merge: true })
  }
  
  async makeNewUserCharacter() {
    const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
    const doc = await userRef.ref.get();
    if (!doc.exists) {
      this.router.navigate(['login'])
    }
    else {
      const data: any = doc.data()
      let charactersArray: character[] = data.characters
      charactersArray.push(this.character.newDefaultCharacter())
      
      const newUser: user = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        characters: charactersArray
      }
      this.updateUserData(newUser)
    }
  }
  
  async deleteUserCharacter(char: character) {
    const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
    const doc = await userRef.ref.get();
    const data: any = doc.data()
    let charactersArray: character[] = data.characters
    
    let index = charactersArray.findIndex(x => {
      return x.ID == char.ID
    })
    if (index > -1) {
      charactersArray.splice(index, 1);
    }
    const newUser: user = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        characters: charactersArray
    }
    this.updateUserData(newUser)
  }
  
  // Updates the database with the current character
  async syncUserCharacter(): Promise<void> {
      const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
      const doc = await userRef.ref.get();
      const data: any = doc.data()
      let charactersArray: character[] = data.characters
      
      let index = charactersArray.findIndex(x => {
        return x.ID == this.character.ID
      })
          
      if (index > -1) {
        charactersArray[index] = this.character.getFullCharacter();
      }
      const newUser: user = {
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          characters: charactersArray
      }
      this.updateUserData(newUser)
    }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.setItem("uid", "")

    this.router.navigate(['/login']);
  }

}