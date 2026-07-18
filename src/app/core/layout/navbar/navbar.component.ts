import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  cartCount = 0;
  firstName = '';

  constructor(
    private cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.firstName = localStorage.getItem('firstName') ?? 'Account';

    this.cartService.cartCount$
      .subscribe(count => {
        this.cartCount = count;
      });

    this.loadCartCount();
  }

  loadCartCount() {

    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      return;
    }

    this.cartService.getCart(userId)
      .subscribe((items: any[]) => {

        const total = items.reduce(
          (sum, x) => sum + x.quantity,
          0
        );

        this.cartService.setCartCount(total);

      });

  }

  logout() {
    this.authService.logout();
  this.cartService.setCartCount(0);

  this.firstName = 'Account';

  this.router.navigate(['/']);  }

}