import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  _authService = inject(AuthService);
  _cartService = inject(CartService);
  _PLATFORM_ID = inject(PLATFORM_ID);
  isLoggedIn!: any;
  countOfCartItems!: number;
  constructor() {}

  ngOnInit(): void {
    this.checkLoggedInStatus();

    this.getCountOfCartItems();
  }

  getCountOfCartItems() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('userToken')) {
        this._cartService.getLoggedUserCart().subscribe({
          next: (res) => {
            // console.log(value);
            this._cartService.numOfCartItems.next(res.numOfCartItems);
          },
        });
      }
    }

    this._cartService.numOfCartItems.subscribe({
      next: (value) => {
        // console.log(value);
        this.countOfCartItems = value;
      },
    });
  }

  checkLoggedInStatus() {
    this.isLoggedIn = this._authService.userData;
    // this._authService.userData.subscribe({
    //   next: (res) => {
    //     console.log(res, 'hleelo jjj');
    //     this.isLoggedIn = res;
    //   },
    // });
    // console.log(this._authService.userData, 'hello');
    // console.log(this._authService.userData.asObservable(), 'hello');
  }

  signOut() {
    this._authService.logOut();
  }
}
