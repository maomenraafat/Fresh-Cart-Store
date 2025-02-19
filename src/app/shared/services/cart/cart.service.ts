import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  token: string = JSON.stringify(localStorage.getItem('userToken'));
  constructor() {}

  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(
      `${this._baseUrl}/cart`,
      { productId }
      // {
      //   headers: { token: JSON.parse(this.token) },
      // }
    );
  }
  updateCartProductQuantity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(
      `${this._baseUrl}/cart/${productId}`,
      { count },
      {
        headers: { token: JSON.parse(this.token) },
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/cart`, {
      headers: { token: JSON.parse(this.token) },
    });
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/cart/${productId}`, {
      headers: { token: JSON.parse(this.token) },
    });
  }
  clearUserCart(): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/cart/`, {
      headers: { token: JSON.parse(this.token) },
    });
  }
}
