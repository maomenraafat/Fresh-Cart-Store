import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);

  constructor() {}
  getProducts(categoryId?: string, brandId?: string): Observable<any> {
    let url = `${this._baseUrl}/products`;
    if (categoryId) {
      url += `?category[in]=${categoryId}`;
    }
    if (brandId) {
      url += categoryId ? `&brand=${brandId}` : `?brand=${brandId}`;
    }

    return this._httpClient.get(url);
  }
  getProductsById(id: string): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/products/${id}`);
  }
}
