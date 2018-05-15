import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private route: Router,
    private productService: ProductService,
    private categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.route.navigate(['/admin/products']);
  }

}
