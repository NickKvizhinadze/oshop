import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
  ) {
    this.subscription = productService.getAll().switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
