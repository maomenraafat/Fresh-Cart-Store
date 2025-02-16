import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../../../shared/components/ui/error-message/error-message.component";
import { CustomInputComponent } from "../../../../shared/components/ui/custom-input/custom-input.component";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  apiErrorMesage!: string;
  isCallingApi: boolean = false;
  subscription: Subscription = new Subscription();

  registerForm!: FormGroup;
  _authService = inject(AuthService);
  _router = inject(Router);
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-Z]\w{5,}$/),
        ]),
        rePassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-Z]\w{5,}$/),
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^01[0125][0-9]{8}$/),
        ]),
      },
      this.validatePassword
    );
  }
  register() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.apiErrorMesage = '';
      this.isCallingApi = true;
      if (this.subscription) this.subscription.unsubscribe();
      this.subscription = this._authService
        .registerUser(this.registerForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isCallingApi = false;
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
  validatePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
