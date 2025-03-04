import { HttpClient } from '@angular/common/http';
import {
  afterNextRender,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItems: WritableSignal<number> = signal(0);
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);

  constructor() {}
  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/cart`, { productId });
  }
  updateCartProductQuantity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(`${this._baseUrl}/cart/${productId}`, {
      count,
    });
  }
  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/cart`);
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/cart/${productId}`);
  }
  clearUserCart(): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/cart`);
  }
}
