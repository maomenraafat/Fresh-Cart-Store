import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  imports: [CarouselModule, RelatedProductComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit {
  isLoading: boolean = false;
  productDetails: Product = {} as Product;
  relatedProducts!: Product[];
  apiError!: string;

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

  ngOnInit(): void {
    this.getID();
  }

  getID() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        this.getProductDetails(res?.params?.id);
      },
    });
    // let x: any = this._activatedRoute.snapshot.params;
    // console.log(x?.id);
    // let { id }: any = this._activatedRoute.snapshot.params;
    // console.log(id);
    // this.getProductDetails(id);
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
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete!');
      },
    });
  }
}
