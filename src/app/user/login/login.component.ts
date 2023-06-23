import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  alertColor = 'blue';
  alertMsg = '';
  showAlert = false;

  isLoading = false;

  constructor(private _afa: AngularFireAuth) {}

  ngOnInit(): void {}

  async onSubmit() {
    this.isLoading = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait. Your are being logged into your account.';
    this.alertColor = 'blue';

    try {
      await this._afa.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (e) {
      console.log(e);
      this.alertMsg = 'Sorry, something went wrong!';
      this.alertColor = 'red';
      this.isLoading = false;

      return;
    }

    this.alertMsg = 'You have successfully logged into your account.';
    this.alertColor = 'green';
    this.isLoading = false;
  }
}
