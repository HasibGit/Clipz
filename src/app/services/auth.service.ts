import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersCollection: AngularFirestoreCollection<IUser>;

  constructor(private _afa: AngularFireAuth, private _db: AngularFirestore) {
    this.usersCollection = this._db.collection('users');
  }

  async createUser(userData: IUser) {
    if (!userData?.password) {
      throw new Error('Password not provided');
    }

    // Register user
    const userCred = await this._afa.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    // Store user info in users collection
    const newUser = {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    };

    if (!userCred.user) {
      throw new Error('User not found');
    }

    await this.usersCollection.doc(userCred.user?.uid).set(newUser);

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }
}
