import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;
  selectedImage = '';
  apiUrl=environment.apiUrl.replace('/api', '');
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

   this.productService
  .getProductById(id)
  .subscribe(res => {

    this.product = res;

    this.product.images = this.product.images ?? [];

    this.selectedImage =
      this.product.images.length > 0
        ? this.product.images[0].imageUrl
        : (this.product.imageUrl ?? '');

    console.log(this.product);
  });
  }
changeImage(url: string): void {
  this.selectedImage = url;
}
  addToCart(): void {

    if (!this.product) {
      return;
    }

    const userId = Number(localStorage.getItem('userId'));

this.cartService
  .add(userId, this.product.id, 1)
  .subscribe({

    next: () => {

      this.toastr.success('Product added to cart');

    },

    error: () => {

      this.toastr.error('Unable to add product');

    }

  });
  }

  
}