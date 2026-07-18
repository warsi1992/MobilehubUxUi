import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { OrderDetail } from '../../core/models/order-detail';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  order?: OrderDetail;
apiUrl = environment.apiUrl.replace('/api', '');
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService
      .getOrderById(id)
      .subscribe({
        next: res => {

          this.order = res;

        }
      });

  }

}