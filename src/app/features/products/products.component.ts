import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const categoryId = Number(params['category']);

      if (categoryId) {

        this.productService
          .getProductsByCategory(categoryId)
          .subscribe(res => {

            this.products = res.items;

          });

      }
      else {

        this.productService
          .getProducts()
          .subscribe(res => {

            this.products = res.items;

          });

      }

    });

  }

}