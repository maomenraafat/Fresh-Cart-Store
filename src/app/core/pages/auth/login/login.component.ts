import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { delay, Subscription, timer } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../../../../shared/components/ui/error-message/error-message.component';
import { CustomInputComponent } from '../../../../shared/components/ui/custom-input/custom-input.component';
import { CartService } from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ErrorMessageComponent,
    CustomInputComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  floating_email: string = 'floating_email';
  floating_password: string = 'floating_password';
  apiErrorMesage!: string;
  isCallingApi: boolean = false;
  subscription: Subscription = new Subscription();
  toggleInput!: boolean;
  loginForm!: FormGroup;
  _authService = inject(AuthService);
  _cartService = inject(CartService);
  _router = inject(Router);
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{5,}$/),
      ]),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.apiErrorMesage = '';
      this.isCallingApi = true;
      this.subscription = this._authService
        .loginUser(this.loginForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isCallingApi = false;
            localStorage.setItem('userToken', data.token);
            this._authService.saveUser();
            this._router.navigate(['/home']);
            this._cartService.getLoggedUserCart().subscribe({
              next: (res) => {
                // console.log(value);
                this._cartService.numOfCartItems.next(res.numOfCartItems);
              },
            });
            // setTimeout(() => {
            //   this._router.navigate(['/home']);
            // }, 2000);

            // timer(2000).subscribe(() => {
            //   this._router.navigate(['/home']);
            // });
            // delay()
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
  togglePassword() {
    this.toggleInput = !this.toggleInput;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
