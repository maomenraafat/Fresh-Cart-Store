import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { Product } from '../../../../../shared/interfaces/product';
import { Wishlist } from '../../../../../shared/interfaces/wishlist';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-related-product',
  imports: [ProductItemComponent],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss',
})
export class RelatedProductComponent implements OnInit {
  @Input() relatedProducts!: Product[];
  wishList!: Wishlist[];
  _productService = inject(ProductService);
  _cartService = inject(CartService);
  _toastrService = inject(ToastrService);
  _wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getUserWithlist();
  }
  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.removeItemFromWishList(id);
        this._toastrService.success(res.message, 'Fresh Cart ');
        this._cartService.numOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete!');
      },
    });
  }
  addToWishList(productId: string) {
    const userInfo = { productId };
    this._wishlistService.addProductToWishlist(userInfo).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.message, 'Fresh Cart ');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete!');
      },
    });
  }

  getUserWithlist() {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishList = res.data;
      },
    });
  }

  removeItemFromWishList(id: string) {
    this._wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getUserWithlist();
      },
    });
  }
}
