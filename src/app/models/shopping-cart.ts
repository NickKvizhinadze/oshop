import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    constructor(public items: { [productId: string]: ShoppingCartItem }) {
        for (const productId in items) {
            if (items.hasOwnProperty(productId)) {
                const item = items[productId];
                this.itemsList.push(new ShoppingCartItem(item.product, item.quantity));
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
    get totalPrice() {
        let sum = 0;
        this.itemsList.forEach(item => {
            sum += item.totalPrice;
        });
        return sum;
    }
}
