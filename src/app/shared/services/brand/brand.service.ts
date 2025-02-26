import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../token/api-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);

  constructor() {}

  getAllBrands(): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/brands`);
  }

  getSpecificBrands(id: string): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/brands/${id}`);
  }
}
