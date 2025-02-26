import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../token/api-token';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  constructor() {}

  getLoggedUserWishlist(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/wishlist`);
  }
  addProductToWishlist(userInfo: { productId: string }): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/wishlist`, userInfo);
  }
  removeProductFromWishlist(id: string): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/wishlist/${id}`);
  }
}
