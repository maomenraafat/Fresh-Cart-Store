import { Component, Input } from '@angular/core';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-card-item',
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent {
  @Input() item!: Category;
}
