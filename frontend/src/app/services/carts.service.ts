import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart.model';
import { cartAddedAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartsService {

    constructor(private http: HttpClient) { }

    // Add Cart: 
    public async addCart(cart: CartModel) {
        const addedCart = await this.http.post<CartModel>(environment.cartUrl, cart).toPromise();
        store.dispatch(cartAddedAction(addedCart));
        return addedCart;
    }
}
