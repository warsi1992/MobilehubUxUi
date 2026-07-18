import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadCategories();

  }

  loadCategories() {

    this.categoryService
      .getAll()
      .subscribe(res => {

        this.categories = res;

      });

  }

  addCategory() {

    this.router.navigate(['/admin/categories/add']);

  }

  edit(id: number) {

    this.router.navigate(['/admin/categories/edit', id]);

  }

  delete(id: number) {

    if (!confirm('Delete this category?')) {
      return;
    }

    this.categoryService
      .delete(id)
      .subscribe(() => {

        this.loadCategories();

      });

  }

}