import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;
  // product = Input<Product>().required;
}
