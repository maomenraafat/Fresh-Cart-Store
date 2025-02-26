import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { CustomInputComponent } from '../../../shared/components/ui/custom-input/custom-input.component';
import { OrderService } from '../../../shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

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
  private readonly _toastrService = inject(ToastrService);
  private readonly _cartService = inject(CartService);
  private readonly _router = inject(Router);
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
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
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
            this._toastrService.success(
              'Thank you for shopping with us!',
              'Fresh Cart '
            );
            this._cartService.numOfCartItems.next(0);
            this._router.navigate(['/orders']);
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
            this._cartService.numOfCartItems.next(0);
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
