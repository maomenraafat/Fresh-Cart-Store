import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { CardItemComponent } from '../../../shared/components/ui/card-item/card-item.component';

@Component({
  selector: 'app-categories',
  imports: [CardItemComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  namePage: string = '/categories';
  _categoriesService = inject(CategoriesService);
  categories!: Category[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data.data);
        this.categories = data.data;
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
