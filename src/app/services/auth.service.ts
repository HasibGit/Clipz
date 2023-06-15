import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _afa: AngularFireAuth, private _db: AngularFirestore) {}

  async createUser(userData: IUser) {
    // Register user
    await this._afa.createUserWithEmailAndPassword(
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

    await this._db.collection('users').add(newUser);
  }
}
