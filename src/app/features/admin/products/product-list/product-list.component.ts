import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product';

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
  ) { }

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (response) => {

          this.products = response.items;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  delete(id: number): void {

    if (!confirm('Are you sure you want to delete this product?'))
      return;

    this.productService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadProducts();

        },

        error: (err) => {

          console.error(err);

          alert('Unable to delete product.');

        }

      });

  }

}