import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { CreateOrderRequest } from '../models/create-order-request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api = environment.apiUrl+'/orders';

  constructor(private http: HttpClient) { }

  createOrder(request: CreateOrderRequest): Observable<any> {
    return this.http.post(this.api, request);
  }

  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}/${userId}`);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.api}/details/${id}`);
  }
}