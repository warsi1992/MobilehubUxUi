import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ProductImage } from '../models/product-image';


@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/ProductImages`;

  getImages(productId: number): Observable<ProductImage[]> {

    return this.http.get<ProductImage[]>(
      `${this.api}/${productId}`
    );

  }

  upload(productId: number, file: File) {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${this.api}/${productId}`,
      formData
    );

  }

  delete(imageId: number) {

    return this.http.delete(
      `${this.api}/${imageId}`
    );

  }

}