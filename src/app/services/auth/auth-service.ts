import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import firebase from 'firebase/app';
import 'firebase/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../user-type';
import { Character } from '../character-type';
import { CharacterService } from '../character.service';

// Thanks so much to Jeff Delany for the Google Auth tutorial!
// https://fireship.io/lessons/angularfire-google-oauth/

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;
  provider = new firebase.auth.GoogleAuthProvider();
  userData: any;
  
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
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }
  
  // Sign in with Google
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(this.provider);
    const userRef = this.afs.collection('users').doc(`${credential.user.uid}`);
    const doc = await userRef.ref.get();
    
    if (!doc.exists) {
      // New user
        this.updateUserData({
          displayName: credential.user.displayName,
          uid: credential.user.uid,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
          characters: [this.character.newDefaultCharacter()]
      })
    } else {
      // Existing user
      this.userData = doc.data()
    }
    
    // Store the uid of the current user in localstorage for further use
    localStorage.setItem("uid", String(credential.user.uid))
    
    this.router.navigateByUrl('/dashboard')
  }
  
  // Gets all of the characters that the current user has
  async getUserCharacterData(): Promise<Character[]> {
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

  // Uploads local user data (including characters) to Firestore
  updateUserData(user: User) {
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      characters: user.characters
    } 
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${data.uid}`);
    
    console.log('Updating user data')
    userRef.set(data, { merge: true })
  }
  
  // Make a new default character with the character service and upload it to Firestore
  async makeNewUserCharacter() {
    const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
    const doc = await userRef.ref.get();
    if (!doc.exists) {
      this.router.navigate(['login'])
    }
    else {
      const data: any = doc.data()
      let charactersArray: Character[] = data.characters
      charactersArray.push(this.character.newDefaultCharacter())
      
      const newUser: User = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        characters: charactersArray
      }
      this.updateUserData(newUser)
    }
  }
  
  // Deletes a character from the local character array and updates Firestore
  async deleteUserCharacter(char: Character) {
    const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
    const doc = await userRef.ref.get();
    const data: any = doc.data()
    let charactersArray: Character[] = data.characters
    
    // Ge the index of the character the user wants to deletef
    let index = charactersArray.findIndex(x => {
      return x.ID == char.ID
    })
    
    if (index > -1) {
      charactersArray.splice(index, 1);
    }
      const newUser: User = {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        characters: charactersArray
    }
    this.updateUserData(newUser)
  }
  
  // Updates the database with the current character
  // This function is called every 10 seconds from the character sheet
  async syncUserCharacter(): Promise<void> {
      const userRef = this.afs.collection('users').doc(`${localStorage.getItem("uid")}`);
      const doc = await userRef.ref.get();
      const data: any = doc.data()
      let charactersArray: Character[] = data.characters
      
      let index = charactersArray.findIndex(x => {
        return x.ID == this.character.ID
      })
          
      if (index > -1) {
        charactersArray[index] = this.character.getFullCharacter();
      }
      const newUser: User = {
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