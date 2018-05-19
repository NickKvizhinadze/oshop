import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    constructor(public items: { [productId: string]: ShoppingCartItem }) {
        for (const productId in items) {
            if (items.hasOwnProperty(productId)) {
                this.itemsList.push(items[productId]);
            }
        }
    }

    itemsList: ShoppingCartItem[] = [];

    get totalItems() {
        let count = 0;
        for (const productId in this.items) {
            if (this.items.hasOwnProperty(productId)) {
                count += this.items[productId].quantity;
            }
        }
        return count;
    }

    get productIds() {
        return Object.keys(this.items);
    }
}
