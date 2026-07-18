import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CartService } from '../../core/services/cart.service';
import {OrderService} from '../../core/services/order.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];

  grandTotal = 0;

  checkoutForm;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
      private orderService: OrderService,
        private router: Router
  ) {

    this.checkoutForm = this.fb.nonNullable.group({

      fullName: ['', Validators.required],

      phone: ['', Validators.required],

      address: ['', Validators.required],

      city: ['', Validators.required],

      state: ['', Validators.required],

      pincode: ['', Validators.required]

    });

  }

  ngOnInit(): void {

    this.loadCart();

  }

  loadCart() {

    this.cartService.getCart(1)
      .subscribe(items => {

        this.cartItems = items;

        this.grandTotal =
          items.reduce((sum: number, x: any) => sum + x.total, 0);

      });

  }

  placeOrder() {

  if (this.checkoutForm.invalid) {
    this.checkoutForm.markAllAsTouched();
    return;
  }

  const request = {
  userId: Number(localStorage.getItem('userId')),
  fullName: this.checkoutForm.value.fullName!,
  phone: this.checkoutForm.value.phone!,
  address: this.checkoutForm.value.address!,
  city: this.checkoutForm.value.city!,
  state: this.checkoutForm.value.state!,
  pincode: this.checkoutForm.value.pincode!
};

  this.orderService.createOrder(request).subscribe({
    next: (res) => {
      alert(res.message);
      this.router.navigate(['/order-success']);
    },
    error: (err) => {
      alert(err.error?.message ?? 'Failed');
    }
  });

}

}