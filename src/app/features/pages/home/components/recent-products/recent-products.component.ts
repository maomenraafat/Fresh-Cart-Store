import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../../shared/services/wishlist.service';
import { Wishlist } from '../../../../../shared/interfaces/wishlist';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent, FormsModule],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
})
export class RecentProductsComponent implements OnInit {
  searchValue: string = '';
  products!: Product[];
  filteredProducts: Product[] = [];
  wishList!: Wishlist[];
  _productService = inject(ProductService);
  _cartService = inject(CartService);
  _toastrService = inject(ToastrService);
  _wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getProducts();
    this.getUserWithlist();
  }
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data;
        this.filteredProducts = data.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete!');
      },
    });
  }

  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
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
        this.getUserWithlist();
      },
    });
  }

  search() {
    if (!this.searchValue) {
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.products.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(this.searchValue.toLowerCase());
    });
  }
}
