import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
})
export class RecentProductsComponent implements OnInit {
  products!: Product[];
  _productService = inject(ProductService);
  _cartService = inject(CartService);
  _toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data.data;
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
}
