import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartDetails!: Cart;
  _cartService = inject(CartService);
  emptyCart: boolean = false;

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  removeItemFromCart(id: string) {
    this._cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this._cartService.numOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  UpdateCart(id: string, count: number) {
    this._cartService.updateCartProductQuantity(id, `${count}`).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  clearCart() {
    this._cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);

        if (res.message == 'success') {
          this.cartDetails = {} as Cart;
          this.emptyCart = true;
          this._cartService.numOfCartItems.next(0);
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
