import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../../core/services/category.service';
import { CategoryImageService } from '../../../../core/services/category-image.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {

  form!: FormGroup;

  isEdit = false;

  categoryId = 0;

  selectedFile?: File;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: CategoryImageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({

      name: ['', Validators.required],

      description: [''],

      isActive: [true]

    });

    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.categoryId) {

      this.isEdit = true;

      this.categoryService
        .getById(this.categoryId)
        .subscribe(category => {

          this.form.patchValue({

            name: category.name,

            description: category.description,

            isActive: category.isActive

          });

          if (category.imageUrl) {

            this.imagePreview =
              'https://mobilehub-production-cfae.up.railway.app/' + category.imageUrl;

          }

        });

    }

  }

  onFileSelected(event: any) {

    if (!event.target.files.length)
      return;

    this.selectedFile = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result;

    };

    reader.readAsDataURL(this.selectedFile!);

  }

  save() {

    if (this.form.invalid)
      return;

    if (this.isEdit) {

      this.updateCategory();

    }
    else {

      this.createCategory();

    }

  }

  createCategory() {

    this.categoryService
      .createcat(this.form.value)
      .subscribe((id: number) => {

        if (this.selectedFile) {

          this.imageService
            .upload(id, this.selectedFile)
            .subscribe(() => {

              this.router.navigate(['/admin/categories']);

            });

        }
        else {

          this.router.navigate(['/admin/categories']);

        }

      });

  }

  updateCategory() {
  debugger;
    this.categoryService
      .updatecat(this.categoryId, this.form.value)
      .subscribe(() => {

        if (this.selectedFile) {

          this.imageService
            .upload(this.categoryId, this.selectedFile)
            .subscribe(() => {

              this.router.navigate(['/admin/categories']);

            });

        }
        else {

          this.router.navigate(['/admin/categories']);

        }

      });

  }

}