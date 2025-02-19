import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import {
  AuthUser,
  LoginUser,
  ResetUserPassword,
} from '../../interfaces/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  _httpClient = inject(HttpClient);
  _baseUrl = inject(API_BASE_URL);
  _router = inject(Router);
  constructor() {
    afterNextRender(() => {
      this.isLoggedInUser();
    });
  }

  registerUser(userInfo: AuthUser): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/auth/signup`, userInfo);
  }
  loginUser(userInfo: LoginUser): Observable<any> {
    return this._httpClient.post(`${this._baseUrl}/auth/signin`, userInfo);
  }

  saveUser() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      console.log(this.userData);
    }
  }

  isLoggedInUser(): boolean {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/auth/login']);
  }

  forgetPassword(email: string): Observable<any> {
    return this._httpClient.post(
      `${this._baseUrl}/auth/forgotPasswords`,
      email
    );
  }
  verifyResetCode(resetCode: string): Observable<any> {
    return this._httpClient.post(
      `${this._baseUrl}/auth/verifyResetCode`,
      resetCode
    );
  }

  resetPassword(userInfo: ResetUserPassword): Observable<any> {
    return this._httpClient.put(
      `${this._baseUrl}/auth/resetPassword`,
      userInfo
    );
  }
}
