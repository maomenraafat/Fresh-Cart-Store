import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Wishlist } from '../../../shared/interfaces/wishlist';

@Component({
  selector: 'app-products-details',
  imports: [CarouselModule, RelatedProductComponent, NgClass],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit {
  isInWishList: boolean = false;
  wishList!: Wishlist[];
  isLoading: boolean = false;
  productDetails: Product = {} as Product;
  relatedProducts!: Product[];
  apiError!: string;
  productId!: string;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getID();
  }

  getID() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        this.productId = res?.params?.id;
        this.getUserWithlist();
        this.get();
        this.getProductDetails(res?.params?.id);
      },
    });
  }

  getProductDetails(id: string) {
    this._productService.getProductsById(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
        this.getRelatedProducts(this.productDetails.category._id);
      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.message;
        console.log(this.apiError);
      },
      complete: () => {
        console.log('complete!');
      },
    });
  }
  getRelatedProducts(categoryId: string) {
    this._productService.getProducts(categoryId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.relatedProducts = res.data;
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
    this.isLoading = true;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._toastrService.success(res.message, 'FreshCart!');
        this._cartService.numOfCartItems.set(res.numOfCartItems);
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
        this.isInWishList = true;
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
        console.log(res);
        this.wishList = res.data;
        this.get();
      },
    });
  }

  get() {
    if (!this.wishList) return;
    this.isInWishList = this.wishList.some(
      (item) => item._id === this.productId
    );
  }
}
