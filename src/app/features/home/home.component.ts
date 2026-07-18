import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySectionComponent } from '../../shared/components/category-list/category-list.component';
import { NavbarComponent } from '../../core/layout/navbar/navbar.component';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    
    HeroBannerComponent,
    ProductGridComponent,
    CategorySectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}