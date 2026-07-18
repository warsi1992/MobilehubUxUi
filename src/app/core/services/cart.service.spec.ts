import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);

  private api = 'https://localhost:7110/api/Cart';

  add(productId: number, quantity: number): Observable<any> {

    return this.http.post(this.api, {
      userId: 1,          // Temporary until JWT authentication
      productId,
      quantity
    });

  }

  getCart(userId: number): Observable<any> {

    return this.http.get(`${this.api}/${userId}`);

  }

}