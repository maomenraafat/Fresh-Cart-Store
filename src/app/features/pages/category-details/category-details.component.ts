import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { RelatedProductComponent } from '../products-details/components/related-product/related-product.component';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-category-details',
  imports: [RelatedProductComponent],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit {
  _activatedRoute = inject(ActivatedRoute);
  categoryDetails!: Category;
  relatedProducts!: Product[];
  _productService = inject(ProductService);

  private readonly _categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getID();
  }

  getID() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        this.getCategoryDetails(res?.params?.id);
        this.getRelatedProducts(res?.params?.id);
      },
    });
    // let x: any = this._activatedRoute.snapshot.params;
    // console.log(x?.id);
    // let { id }: any = this._activatedRoute.snapshot.params;
    // console.log(id);
    // this.getProductDetails(id);
  }

  getCategoryDetails(id: string) {
    this._categoriesService.getSpecificCategory(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.categoryDetails = res.data;
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
}
