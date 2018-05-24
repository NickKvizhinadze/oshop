import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/products').snapshotChanges().map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        return { key: key, ...a.payload.val() };
      });
    });
  }

  create(product) {
    this.db.list('/products').push(product);
  }

  get(productId) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    this.db.object('/products/' + productId).remove();
  }

}
