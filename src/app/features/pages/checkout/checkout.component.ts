import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { CustomInputComponent } from '../../../shared/components/ui/custom-input/custom-input.component';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartId!: string;
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _orderService = inject(OrderService);
  ngOnInit(): void {
    this.getCartId();
    this.initForm();
  }

  getCartId() {
    this.cartId = this._activatedRoute.snapshot.params['id'];
  }

  initForm() {
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  completeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
    } else {
      this._orderService
        .createCashOrder(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    }
  }
  OnlinePayment() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
    } else {
      this._orderService
        .onlinePayment(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    }
  }
}
