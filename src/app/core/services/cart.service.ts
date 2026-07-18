import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);

  private api = environment.apiUrl+'Cart';

  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  setCartCount(count: number) {
    this.cartCount.next(count);
  }

  getCartCount() {
    return this.cartCount.value;
  }

add(userId: number, productId: number, quantity: number) {

  return this.http.post(this.api, {
    userId,
    productId,
    quantity
  });

}

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.api}/${userId}`);
  }

  update(cartItemId: number, quantity: number): Observable<any> {

  return this.http.put(`${this.api}/update`, {
    cartItemId,
    quantity
  });

}

remove(cartItemId: number): Observable<any> {

  return this.http.delete(`${this.api}/${cartItemId}`);

}

clearCart(userId: number): Observable<any> {

  return this.http.delete(`${this.api}/user/${userId}`);

}
}