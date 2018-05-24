import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = { key: '', title: '', price: 0, category: '', imageUrl: '' };
  productId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.get(this.productId).take(1).subscribe(p => this.product = p);
    }

  }

  ngOnInit() {
  }

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }
}
