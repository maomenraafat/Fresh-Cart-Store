import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';
import { Wishlist } from '../../../interfaces/wishlist';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink, NgClass],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent implements OnInit, OnChanges {
  @Input() product!: Product;
  @Input() wishList!: Wishlist[];
  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter();
  @Output() fireAddToWishList: EventEmitter<string> = new EventEmitter();
  isInWishList: boolean = false;

  handleAddToCart(id: string) {
    this.fireAddToCart.emit(id);
  }
  handleAddToWishList(id: string) {
    this.fireAddToWishList.emit(id);
    this.isInWishList = !this.isInWishList;
  }

  ngOnInit(): void {
    this.get();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wishList'] || changes['product']) {
      this.get();
    }
  }

  get() {
    if (!this.wishList || !this.product) return;

    this.isInWishList = this.wishList.some(
      (item) => item._id === this.product._id
    );
  }
}
