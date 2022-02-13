import { cartDownloadedAction } from 'src/app/redux/carts-state';
import { UserModel } from './../../../models/user.model';
import { ItemModel } from './../../../models/item.model';
import { CartModel } from './../../../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifyService } from './../../../services/notify.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { itemAddedAction } from 'src/app/redux/items-state';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
    
    @Input()
    public product: ProductModel;

    public imagesUrl = environment.imagesUrl;

    public cart: CartModel;

    public user: UserModel;

    public item = new ItemModel();


    constructor(
        private http: HttpClient, private notify: NotifyService, private router: Router
    ) { this.item.amount = 0 }


    ngOnInit(): void {

        this.item.amount;
        this.plusAmount();
        this.minusAmount();
    }


    public minusAmount() {

        if (this.item.amount !== 1) {

            this.item.amount-- ;
        }
    }

    public  plusAmount() {

        if (this.item.amount !== 20) {

            this.item.amount++ ;
        }
    }

    public async addItemIntoCart() {

        //get user from redux-auth-state:
        this.user = store.getState().authState.user;

        try {
            if (this.user) {
                //get cart by user-ID:
                this.cart = await this.http.get<CartModel>(environment.cartsByUserUrl + this.user.id).toPromise();

                //Define the relation between columns of Item:
                this.item.cartId = this.cart.id;
                this.item.productId = this.product.id;

                //validation input-amount:

                if (this.item.amount > 0) {

                    // Define the relation between columns of Item:
                    this.item.generalPrice = this.item.amount * this.product.price;

                    // add item into cart:
                    this.item = await this.http.post<ItemModel>(environment.itemsUrl, this.item).toPromise();
                    store.dispatch(itemAddedAction(this.item));
                } else {
                    this.notify.error("Amount can't be Negative or equal to zero !");
                }

            }
            else {
                this.notify.error("you must be login");
            }

        }
        catch (err) {
            this.notify.error(err);
        }
    }
}
