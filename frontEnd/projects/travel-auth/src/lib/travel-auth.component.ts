import { Component, OnInit } from '@angular/core';
import {TravelAuthService} from './travel-auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginInterface} from './interfaces/login.interface';
import {SignupInterface} from './interfaces/signup.interface';

@Component({
  selector: 'lib-TravelAuth',
  template: `
    <mat-tab-group class="login-container sign-up-container">
      <mat-tab label="Login">
        <form class="login-container" [formGroup]="loginForm">
          <h1>Login: </h1>
          <mat-form-field class="example-full-width">
            <mat-label>Username</mat-label>
            <input matInput placeholder="Username" formControlName="username"/>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Password</mat-label>
            <input matInput placeholder="password" type="password" formControlName="password"/>
          </mat-form-field>
          <button mat-stroked-button (click)="logIn()">Login</button>
        </form>
      </mat-tab>

      <mat-tab label="Sign up">
        <form class="sign-up-container" [formGroup]="signUpForm">
          <h1>Sign up: </h1>
          <mat-form-field class="example-full-width">
            <mat-label>Username</mat-label>
            <input matInput placeholder="Username" formControlName="username"/>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Email</mat-label>
            <input matInput placeholder="Email" formControlName="email"/>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Password</mat-label>
            <input matInput placeholder="password" type="password" formControlName="password1"/>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Repeat password</mat-label>
            <input matInput placeholder="password" type="password" formControlName="password2"/>
          </mat-form-field>

          <button mat-stroked-button (click)="signUp()">Sign up</button>
        </form>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ['travel-auth.component.scss']
})
export class TravelAuthComponent implements OnInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;

  constructor(private auth: TravelAuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
    this.signUpForm = this.fb.group({
      username: '',
      password1: '',
      password2: '',
      email: ['', Validators.email]
    });
  }

  ngOnInit(): void {
    this.auth.getData().subscribe(v => console.log(`response ${JSON.stringify(v)}`));
  }

  logIn(): void {
    this.auth.logIn(this.loginForm.value as LoginInterface).subscribe(v => {
      console.log(v);
    });
  }

  signUp(): void {
    console.log(this.signUpForm.value);
    this.auth.signUp(this.signUpForm.value as SignupInterface).subscribe(v => {
      console.log(v);
    });
  }
}
