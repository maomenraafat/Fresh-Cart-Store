import { Component, inject } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { Brand } from '../../../shared/interfaces/brand';
import { CardItemComponent } from '../../../shared/components/ui/card-item/card-item.component';

@Component({
  selector: 'app-brands',
  imports: [CardItemComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  namePage: string = '/brands';

  _brandService = inject(BrandService);
  brands!: Brand[];

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this._brandService.getAllBrands().subscribe({
      next: (data) => {
        console.log(data.data);
        this.brands = data.data;
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
