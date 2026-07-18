import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductImageService } from '../../../../core/services/product-image.service';
import { ProductImage } from '../../../../core/models/product-image';
import { environment } from '../../../../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';

import { Category } from '../../../../core/models/category';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  selectedFile?: File;

images: ProductImage[] = [];

apiUrl = environment.apiUrl.replace('/api', '');
  categories: Category[] = [];

  productId = 0;

  isEdit = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private productImageService: ProductImageService,
  ) {

    this.form = this.fb.group({

      name: ['', Validators.required],

      description: [''],

      price: [0, Validators.required],

      discountPrice: [0],

      stockQuantity: [0, Validators.required],

      sku: ['', Validators.required],

      categoryId: [0, Validators.required],

      brandName: [''],

      color: [''],

      compatibility: [''],

      warrantyMonths: [0],

      weight: [0],

      isFeatured: [false],

      isActive: [true]

    });

  }

  ngOnInit(): void {

  this.loadCategories();

  this.productId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  if (this.productId > 0) {

    this.isEdit = true;

    this.loadProduct();
    this.loadImages();

  }

}
loadImages() {

    this.productImageService
        .getImages(this.productId)
        .subscribe(res => {

            this.images = res;

        });

}

onFileSelected(event: any) {

    this.selectedFile = event.target.files[0];

}

uploadImage() {

    if (!this.selectedFile)
        return;

    this.productImageService
        .upload(this.productId, this.selectedFile)
        .subscribe(() => {

            alert('Image Uploaded');

            this.selectedFile = undefined;

            this.loadImages();

        });

}

deleteImage(id: number) {

    if (!confirm('Delete image?'))
        return;

    this.productImageService
        .delete(id)
        .subscribe(() => {

            this.loadImages();

        });

}
loadCategories() {

  this.categoryService
    .getCategories()
    .subscribe({

      next: (res) => {

        this.categories = res;

      },

      error: (err) => {

        console.error(err);

      }

    });

}

loadProduct() {

  this.productService
    .getProductById(this.productId)
    .subscribe({

      next: (product) => {

        this.form.patchValue({

          name: product.name,

          description: product.description,

          price: product.price,

          discountPrice: product.discountPrice,

          stockQuantity: product.stockQuantity,

          sku: product.sku,

          categoryId: product.categoryId,

          brandName: product.brandName ?? '',

          color: product.color ?? '',

          compatibility: product.compatibility ?? '',

          warrantyMonths: product.warrantyMonths,

          weight: product.weight,

          isFeatured: product.isFeatured,

          isActive: product.isActive

        });

      },

      error: (err) => {

        console.error(err);

      }

    });

}

  save() {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;

  }

  const request = this.form.getRawValue();

  if (this.isEdit) {

    this.productService
      .update(this.productId, {

        id: this.productId,

        ...request

      })
      .subscribe({

        next: () => {

          alert('Product Updated Successfully');

          this.router.navigate(['/admin/products']);

        },

        error: err => {

          console.error(err);

          alert('Unable to update product.');

        }

      });

  }
  else {

    this.productService
      .create(request)
      .subscribe({

        next: () => {

          alert('Product Created Successfully');

          this.router.navigate(['/admin/products']);

        },

        error: err => {

          console.error(err);

          alert('Unable to create product.');

        }

      });

  }

}

}