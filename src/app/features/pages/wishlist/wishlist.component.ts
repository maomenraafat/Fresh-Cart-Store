import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Wishlist } from '../../../shared/interfaces/wishlist';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  isLoading!: boolean;
  wishList!: Wishlist[];
  _wishlistService = inject(WishlistService);
  _cartService = inject(CartService);
  ngOnInit(): void {
    this.getUserWithlist();
  }

  getUserWithlist() {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
      },
    });
  }

  removeItem(id: string) {
    this._wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getUserWithlist();
      },
    });
  }

  addProductToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.removeItem(id);
        this._cartService.numOfCartItems.next(res.numOfCartItems);
      },
    });
  }
}
