import { Component, Input } from '@angular/core';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { Product } from '../../../../../shared/interfaces/product';

@Component({
  selector: 'app-related-product',
  imports: [ProductItemComponent],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.scss',
})
export class RelatedProductComponent {
  @Input() relatedProducts!: Product[];
}
