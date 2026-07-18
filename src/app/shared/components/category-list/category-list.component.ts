import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CategoryService } from '../../../core/services/category.service';
import { HomeCategory } from '../../../core/models/home-category';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategorySectionComponent implements OnInit {
apiUrl = environment.apiUrl.replace('/api', '');
  categories: HomeCategory[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.categoryService
      .getHomeCategories()
      .subscribe(res => {

        this.categories = res;

      });

  }

  openCategory(id: number) {

    this.router.navigate(
      ['/products'],
      {
        queryParams: {
          category: id
        }
    });

  }

}