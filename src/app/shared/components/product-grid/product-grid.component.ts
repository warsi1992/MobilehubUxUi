import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {

  private service = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {

    this.service.getProducts()
      .subscribe(response => {

        this.products = response.items;
        console.log(this.products);

      });

  }

}