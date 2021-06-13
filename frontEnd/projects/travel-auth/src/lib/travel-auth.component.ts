import {Component, OnInit, ViewChild} from '@angular/core';
import {TravelAuthService} from './travel-auth.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LoginInterface} from './interfaces/login.interface';
import {SignupInterface} from './interfaces/signup.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabGroup} from '@angular/material/tabs';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-TravelAuth',
  template: `
    <h1>Travel app</h1>
    <mat-tab-group class="login-container sign-up-container" #authTabGroup>
      <mat-tab label="Login">
        <form class="login-container" [formGroup]="loginForm">
          <mat-form-field class="example-full-width">
            <mat-label>Username*</mat-label>
            <input matInput placeholder="Username" formControlName="username"/>
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')"> This is required field </mat-error>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Password*</mat-label>
            <input matInput placeholder="password" type="password" formControlName="password"/>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')"> This is required field </mat-error>
          </mat-form-field>
          <button mat-stroked-button (click)="logIn()">Login</button>
        </form>
      </mat-tab>

      <mat-tab label="Sign up">
        <form class="sign-up-container" [formGroup]="signUpForm">
          <mat-form-field class="example-full-width">
            <mat-label>Username*</mat-label>
            <input matInput placeholder="Username" formControlName="username"/>
            <mat-error *ngIf="signUpForm.get('username')?.hasError('required')"> This is required field </mat-error>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Email*</mat-label>
            <input matInput placeholder="Email" formControlName="email"/>
            <mat-error *ngIf="signUpForm.get('email')?.hasError('email')"> It is not proper email address </mat-error>
            <mat-error *ngIf="signUpForm.get('email')?.hasError('required')"> This is required field </mat-error>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Password*</mat-label>
            <input matInput placeholder="password" type="password" formControlName="password1"/>
            <mat-error *ngIf="signUpForm.get('password1')?.hasError('required')"> This is required field </mat-error>
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <mat-label>Repeat password*</mat-label>
            <input matInput placeholder="password" type="password" formControlName="password2"/>
            <mat-error *ngIf="signUpForm.get('password2')?.hasError('required')"> This is required field </mat-error>
          </mat-form-field>

          <mat-error *ngIf="signUpForm?.hasError('passwordNotSameError')"> Password and Repeat password are not same </mat-error>

          <div class="actions">
            <button mat-stroked-button (click)="signUp()">Sign up</button>
          </div>
        </form>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrls: ['travel-auth.component.scss']
})
export class TravelAuthComponent {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  @ViewChild('authTabGroup', { static: false }) tabGroup: MatTabGroup | undefined;

  constructor(private auth: TravelAuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    }, { validators: passwordValidation });
  }

  logIn(): void {
    this.auth.logIn(this.loginForm.value as LoginInterface).subscribe(() => {
      this.router.navigate(['/trip/list']);
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      const signUpForm = this.signUpForm.value;
      this.auth.signUp({ username: signUpForm.username, email: signUpForm.email, password: signUpForm.password1 } as SignupInterface)
        .subscribe(() => {
          if (this.tabGroup) {
            this.tabGroup.selectedIndex = 0;
          }
          this.signUpForm.reset();
      });
    }
  }

}

export const passwordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password1 = control.get('password1')?.value;
  const password2 = control.get('password2')?.value;

  return password1 !== password2 ? { passwordNotSameError: true } : null;
};
