import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/operators/map';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        return { key: key, ...a.payload.val() };
      });
    });
  }
}
