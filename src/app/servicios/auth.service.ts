import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;

  constructor( private afAuth:AngularFireAuth, private afs:AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null)
      })
    )
   }

  async login(email:string, password:string): Promise<User>{
    try {
      const { user } = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      return error;
    }
  }
  async logout(): Promise<void>{
    try {
      await this.afAuth.auth.signOut();
      
    } catch (error) {
      console.log(error);
    }
  }
  async register(email:string,password:string): Promise<User>{
    try {
      const {user} = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);      
      await this.sentVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);      
    }
  }
  async loginGoogle(): Promise<User>{
    try {
      const {user}= await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);      
    }
  }
  async resetPassword(email:string): Promise<void>{
    try {
      return this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);      
    }
  }
  async sentVerificationEmail(): Promise<void>{
    try {
      return (await this.afAuth.auth.currentUser).sendEmailVerification();      
    } catch (error) {
      console.log(error);
    }
  }
  isEmailVerified(user:User):Boolean{
    return user.emailVerified === true ? true : false;
  }

  private updateUserData(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
    const data:User = {
      uid:user.uid,
      email:user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data, {merge: true})
  }


}
