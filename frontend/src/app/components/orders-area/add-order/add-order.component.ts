import { ProductsService } from 'src/app/services/products.service';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/models/item.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { CartModel } from 'src/app/models/cart.model';
import store from 'src/app/redux/store';
import { cartDownloadedAction } from 'src/app/redux/carts-state';
import { itemDownloadedAction } from 'src/app/redux/items-state';
import { orderAddedAction } from 'src/app/redux/order-state';

@Component({
    selector: 'app-add-order',
    templateUrl: './add-order.component.html',
    styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

    // Define Data Members:
    public order = new OrderModel();

    public items: ItemModel[];

    public products: ProductModel[];

    public user: UserModel;

    public cart: CartModel;

    public finalPrice: number;

    constructor(private myRouter: Router, private myProductsService: ProductsService,
        private notify: NotifyService, private http: HttpClient) { }

    async ngOnInit() {
        try {

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


            //display total price of all products:
            let totalPrice = [];
            for (let i = 0; i < this.items.length; i++) {
                totalPrice.push(this.items[i].generalPrice);
                this.finalPrice = totalPrice.reduce((sum, item) => sum + item, 0);
            }
        }

        catch (err) {
            this.notify.error(err);
        }
    }


    // add order by form:
    public async addOrder() {

        //Define the columns in cart-table:
        this.user.id = store.getState().authState.user.id;
        this.order.userId = this.user.id;

        this.cart.id = store.getState().cartsState.cart.id;
        this.order.cartId = this.cart.id;

        // get items from redux:
        this.items = store.getState().itemsState.items;

        //display total price of all products:
        let totalPrice = [];
        for (let i = 0; i < this.items.length; i++) {
            totalPrice.push(this.items[i].generalPrice);
            this.finalPrice = totalPrice.reduce((sum, item) => sum + item, 0);
        }

        if (this.order.finalPrice = this.finalPrice) {
            //get current Date:
            let currentDate = new Date().toISOString().slice(0, 10);
            this.order.orderExecutionDate = currentDate;

            //validation date:
            if (this.order.DeliveryDate >= currentDate) {
                //validation credit card:
                if (this.order.creditCard >= 0) {

                    if (this.order.idCard >= 0) {
                        try {
                            this.order = await this.http.post<OrderModel>(environment.ordersUrl, this.order).toPromise();
                            store.dispatch(orderAddedAction(this.order));
                            this.notify.success("Your order has been successfully received by the system.");
                            this.myRouter.navigateByUrl("/thanks");
                        }
                        catch (err) {
                            this.notify.error(err);
                        }
                    }
                    else {
                        this.notify.error("id-card can't be negative.")
                    }
                }
                else {
                    this.notify.error("credit card can't be negative.")
                }
            }
            else {
                this.notify.error(" The date you chose to receive your shipment has already passed. ")
            }

        }
        else {
            this.notify.error("The final price of all products does not exist");
        }




    }

}
