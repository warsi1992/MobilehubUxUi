import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {

    this.loadCart();

  }

  loadCart() {

    const userId = Number(localStorage.getItem('userId'));

this.cartService.getCart(userId)
  .subscribe(res => {

    this.cartItems = res;

  });

  }

  increase(item: CartItem) {

    this.cartService
      .update(item.cartItemId, item.quantity + 1)
      .subscribe(() => this.loadCart());

  }

  decrease(item: CartItem) {

    if (item.quantity == 1)
      return;

    this.cartService
      .update(item.cartItemId, item.quantity - 1)
      .subscribe(() => this.loadCart());

  }

  remove(item: CartItem) {

    this.cartService
      .remove(item.cartItemId)
      .subscribe(() => this.loadCart());

  }

  get total(): number {

    return this.cartItems.reduce(
      (sum, x) => sum + x.total,
      0
    );

  }

}