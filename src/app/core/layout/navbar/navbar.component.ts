import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  _authService = inject(AuthService);
  isLoggedIn!: any;
  constructor() {}

  ngOnInit(): void {
    this.checkLoggedInStatus();
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
