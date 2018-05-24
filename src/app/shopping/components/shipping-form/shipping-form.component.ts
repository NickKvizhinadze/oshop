import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart;
  shipping = { name: '', addressLine1: '', addressLine2: '', city: '' };
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
