import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../token/api-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  token = JSON.stringify(localStorage.getItem('userToken'));
  constructor() {}

  createCashOrder(
    id: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    return this._httpClient.post(
      `${this._baseUrl}/orders/${id}`,
      { shippingAddress },
      { headers: { token: JSON.parse(this.token) } }
    );
  }
  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/orders`);
  }
  getUserOrders(id: string): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/orders/user/${id}`);
  }
  onlinePayment(
    id: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    return this._httpClient.post(
      `${this._baseUrl}/orders/checkout-session/${id}?url=http://localhost:4200
`,
      { shippingAddress },
      { headers: { token: JSON.parse(this.token) } }
    );
  }
}
