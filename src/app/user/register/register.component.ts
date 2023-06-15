import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
  ]);
  confirmPassword = new FormControl('');
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(17),
    Validators.maxLength(17),
  ]);

  alertColor = 'blue';
  alertMsg = '';
  showAlert = false;

  isLoading = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    });
  }

  async register() {
    this.isLoading = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait. Your account is being created!';
    this.alertColor = 'blue';

    try {
      await this._authService.createUser(this.registerForm.value as IUser);
    } catch (e) {
      this.alertMsg = 'Sorry, something went wrong!';
      this.alertColor = 'red';
      this.isLoading = false;
    }

    this.alertMsg =
      'Congratulations! You have successfully created your account.';
    this.alertColor = 'green';
    this.isLoading = false;
  }
}
