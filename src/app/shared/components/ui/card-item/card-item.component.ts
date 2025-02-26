import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { Brand } from '../../../interfaces/brand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-item',
  imports: [RouterLink],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
})
export class CardItemComponent implements OnInit {
  @Input() item!: Category | Brand;
  @Input() itemName!: string;

  ngOnInit(): void {
    console.log(this.itemName);
  }
}
