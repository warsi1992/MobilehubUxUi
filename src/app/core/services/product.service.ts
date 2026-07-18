import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Product } from '../models/product';
import { PagedResponse } from '../models/paged-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/Products`;

  getProducts(): Observable<PagedResponse<Product>> {
    return this.http.get<PagedResponse<Product>>(this.api);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  create(product: any): Observable<number> {
    return this.http.post<number>(this.api, product);
  }

  update(id: number, product: any): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getProductsByCategory(categoryId: number) {
  return this.http.get<any>(`${this.api}/category/${categoryId}`);
}
}