import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts() {

    this.productService
      .getProducts()
      .subscribe(res => {

        this.products = res.items;

      });

  }

  delete(id: number) {

    if (!confirm('Delete this product?'))
      return;

    this.productService
      .delete(id)
      .subscribe(() => {

        this.loadProducts();

      });

  }

}