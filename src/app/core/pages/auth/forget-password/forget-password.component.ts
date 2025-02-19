import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { CustomInputComponent } from '../../../../shared/components/ui/custom-input/custom-input.component';
import { ErrorMessageComponent } from '../../../../shared/components/ui/error-message/error-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CustomInputComponent, ErrorMessageComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  isEmailSend: boolean = false;
  resetPassword: boolean = false;
  apiErrorMesage!: string;
  isCallingApi: boolean = false;
  subscription: Subscription = new Subscription();

  forgetPasswordForm!: FormGroup;
  verifyCodeForm!: FormGroup;

  _authService = inject(AuthService);
  _router = inject(Router);
  ngOnInit(): void {
    this.initForm();
    this.initVerifyForm();
  }

  initForm() {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  initVerifyForm() {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormControl(null, [Validators.required]),
    });
  }

  forgetPassword() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
    } else {
      // this.apiErrorMesage = '';
      this.isCallingApi = true;
      this.subscription = this._authService
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isCallingApi = false;
            this.initVerifyForm();
            this.isEmailSend = true;
          },
          error: (err) => {
            console.log(err);
            this.apiErrorMesage = err.error.message;
            this.isCallingApi = false;
          },
          complete: () => {
            console.log('complete!');
          },
        });
    }
  }
  verify() {
    if (this.verifyCodeForm.invalid) {
      this.verifyCodeForm.markAllAsTouched();
    } else {
      // this.apiErrorMesage = '';
      this.isCallingApi = true;
      this.subscription = this._authService
        .verifyResetCode(this.verifyCodeForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isCallingApi = false;
            this.isEmailSend = false;
            this._router.navigate(['/auth/reset-password']);
          },
          error: (err) => {
            console.log(err);
            this.apiErrorMesage = err.error.message;
            this.isCallingApi = false;
          },
          complete: () => {
            console.log('complete!');
          },
        });
    }
  }

  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }
}
