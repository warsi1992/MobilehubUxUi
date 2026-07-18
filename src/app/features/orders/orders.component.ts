import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,Router} from '@angular/router';

import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/Order';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {

    const userId = Number(localStorage.getItem('userId'));

    this.orderService
      .getOrders(userId)
      .subscribe({
        next: res => {
          this.orders = res;
          console.log(this.orders);
        }
      });

  }

  viewDetails(id: number) {
  console.log(id);
  this.router.navigate(['/orders', id]);
}

}