import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CustomInputComponent } from '../../../../shared/components/ui/custom-input/custom-input.component';
import { ErrorMessageComponent } from '../../../../shared/components/ui/error-message/error-message.component';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CustomInputComponent, ErrorMessageComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  apiErrorMesage!: string;
  isCallingApi: boolean = false;
  subscription: Subscription = new Subscription();

  resetpasswordForm!: FormGroup;

  _authService = inject(AuthService);
  _router = inject(Router);
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetpasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,}$/),
      ]),
    });
  }

  resetPassword() {
    if (this.resetpasswordForm.invalid) {
      this.resetpasswordForm.markAllAsTouched();
    } else {
      this.apiErrorMesage = '';
      this.isCallingApi = true;
      this.subscription = this._authService
        .resetPassword(this.resetpasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isCallingApi = false;
            localStorage.setItem('userToken', res.token);
            this._authService.saveUser();
            this._router.navigate(['/auth/login']);
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
