import {
  afterNextRender,
  Component,
  computed,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  Signal,
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
  countOfCartItems: Signal<number> = computed(() =>
    this._cartService.numOfCartItems()
  );
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then((flowbite) => {
        callback(flowbite);
      });
    }
  }

  ngOnInit(): void {
    this.checkLoggedInStatus();

    this.getCountOfCartItems();
  }

  getCountOfCartItems() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('userToken')) {
        this._cartService.getLoggedUserCart().subscribe({
          next: (res) => {
            this._cartService.numOfCartItems.set(res.numOfCartItems);
          },
        });
      }
    }
  }

  checkLoggedInStatus() {
    this.isLoggedIn = this._authService.userData;
  }

  signOut() {
    this._authService.logOut();
  }
}
