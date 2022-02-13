import { Router } from '@angular/router';
import { ItemModel } from 'src/app/models/item.model';
import { UserModel } from 'src/app/models/user.model';
import { CartModel } from './../../../models/cart.model';
import { ProductModel } from './../../../models/product.model';
import { NotifyService } from './../../../services/notify.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import store from 'src/app/redux/store';
import { cartDownloadedAction } from 'src/app/redux/carts-state';
import { ProductsService } from 'src/app/services/products.service';
import { itemDownloadedAction } from 'src/app/redux/items-state';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'app-cart-by-user',
    templateUrl: './cart-by-user.component.html',
    styleUrls: ['./cart-by-user.component.css']
})

export class CartByUserComponent implements OnInit {

    // Define Data Members:
    public items: ItemModel[];

    public item: ItemModel;

    public product: ProductModel;

    public products: ProductModel[];

    public user: UserModel;

    public cart: CartModel;

    public finalPrice: number;

    public imagesUrl = environment.imagesUrl;

    constructor(
        private http: HttpClient,
        private notify: NotifyService,
        private myProductsService: ProductsService,
        private router: Router,
        private confirmationService: ConfirmationService,

    ) { }

    // get cart of User:
    async ngOnInit() {

        try {

            // get all products:
            this.products = await this.myProductsService.getAllProducts();

            //get user from redux-auth-state:
            this.user = store.getState().authState.user;

            //get cart by user-ID:  
            this.cart = await this.http.get<CartModel>(environment.cartsByUserUrl + this.user.id).toPromise();
            store.dispatch(cartDownloadedAction(this.cart));
            store.getState().cartsState.cart;

            // get items by cart-id:

            this.items = await this.http.get<ItemModel[]>(environment.itemsByCartUrl + this.cart.id).toPromise();
            store.dispatch(itemDownloadedAction(this.items));


            this.getFinalPrice();
            store.getState().itemsState.items;

        }
        catch (err) {
            this.notify.error(err);
        }

    }

    public async getNewState() {
        // get all products:
        this.products = await this.myProductsService.getAllProducts();

        //get user from redux-auth-state:
        this.user = store.getState().authState.user;

        //get cart by user-ID:
        this.cart = await this.http.get<CartModel>(environment.cartsByUserUrl + this.user.id).toPromise();
        store.dispatch(cartDownloadedAction(this.cart));

        // get items by cart-id:
        this.items = await this.http.get<ItemModel[]>(environment.itemsByCartUrl + this.cart.id).toPromise();
        store.dispatch(itemDownloadedAction(this.items));
    }

    // get final price of cart:
    public getFinalPrice() {
        this.items = store.getState().itemsState.items;
        let totalPrice = [];
        for (let i = 0; i < this.items.length; i++) {
            totalPrice.push(this.items[i].generalPrice);
            this.finalPrice = totalPrice.reduce((sum, item) => sum + item, 0);
        }
        return this.finalPrice;
    }

    public async deleteSingleItemFromCart(item: ItemModel) {
        try {
            this.confirmationService.confirm({
                message: 'are you sure to remove this item from your cart?',
                header: 'Delete Item From Cart',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.http.delete(environment.itemsUrl + item.productId + "/" + item.cartId).toPromise();
                    const index = this.items.findIndex(i => i.id === item.id);
                    this.items.splice(index, 1);
                    this.getFinalPrice();
                    this.getNewState();

                },
                reject: () => { }
            });
        }
        catch (err) {
            this.notify.error(err)
        }
    }

    //navigate to order-component:
    public order(): void {

        if (this.finalPrice > 0) {
            this.router.navigateByUrl("/order");
        }
        else {
            this.notify.error("Sorry, you can't order because your cart is still empty! and the final-price is zero!")
        }

    }

    public removeCart() {
        try {
            this.confirmationService.confirm({
                message: 'Are you sure to remove All items from your cart?',
                header: 'Delete All Items From Cart',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.http.delete(environment.emptyCrtUrl + this.cart.id).toPromise();
                    this.getNewState();
                },
                reject: () => { }
            });
        }
        catch (err) {
            this.notify.error(err)
        }
    }

    
  

}

