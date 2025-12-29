import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  totalQuantity: number;
  total: number;
  products: any[]
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private userId = 142; 

  constructor(private apiService: ApiService) {
    // Fetch cart from API on service initialization
    this.loadCartFromApi();
  }

  private loadCartFromApi() {
    this.apiService.get(`carts/user/${this.userId}`).subscribe(
      items => {
         this.cartItems.next(items?.carts || [])
         console.log('Loaded cart from API', this.cartItems.getValue());
      },
      error => {
        console.error('Failed to load cart from API', error);
        this.cartItems.next([]); // fallback to empty cart
      }
    );
  }

  addToCart(item: CartItem) {
    const items = this.cartItems.getValue();
    const index = items.findIndex(i => i.id === item.id);

    if (index > -1) {
      items[index].totalQuantity += item.totalQuantity;
    } else {
      items.push(item);
    }
    this.cartItems.next(items);

    // Optionally update the backend
    this.saveCartToApi(items);
  }

  removeFromCart(id: number) {
    const items = this.cartItems.getValue().filter(i => i.id !== id);
    this.cartItems.next(items);
    this.saveCartToApi(items);
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCartToApi([]);
  }

  getTotalItems(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + item.totalQuantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + item.total, 0);
  }

  private saveCartToApi(items: CartItem[]) {
    // Example API call to save the cart
    this.apiService.post('cart/add', { items }).subscribe({
      next: () => {},
      error: (err) => console.error('Failed to save cart to API', err)
    });
  }
}
