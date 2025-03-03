import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../shared/interfaces/brand';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { RelatedProductComponent } from '../products-details/components/related-product/related-product.component';

@Component({
  selector: 'app-brand-details',
  imports: [RelatedProductComponent],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
})
export class BrandDetailsComponent {
  _activatedRoute = inject(ActivatedRoute);
  brandDetails!: Brand;
  relatedProducts!: Product[];
  private readonly _brandService = inject(BrandService);
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    this.getID();
  }

  getID() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        this.getBrandsDetails(res?.params?.id);
        this.getRelatedProducts(res?.params?.id);
      },
    });
  }

  getBrandsDetails(id: string) {
    this._brandService.getSpecificBrands(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.brandDetails = res.data;
      },
    });
  }

  getRelatedProducts(brandId: string) {
    console.log(brandId);

    this._productService.getProducts(undefined, brandId).subscribe({
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
