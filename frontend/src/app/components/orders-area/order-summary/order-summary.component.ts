import { cartDownloadedAction } from 'src/app/redux/carts-state';
import { OrderModel } from 'src/app/models/order.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
import { ItemModel } from 'src/app/models/item.model';
import jsPDF from 'jspdf';


@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
    public head = [['City', 'street', 'Delivery-date', 'final-Price']];
    public invoiceData: any = [];
    public order: OrderModel;
    public lastOrder: OrderModel[];
    public cart: CartModel;
    public item: ItemModel;
    public items: ItemModel[];
    public user: UserModel;
    public orders: OrderModel[];
    public finalPrice: number;
    public deliveryDate: string;
    public cityForDelivery: string;
    public streetForDelivery: string;
    public orderExecutionDate: string;

    @ViewChild('htmlData') htmlData: ElementRef;

    constructor(private http: HttpClient, private notify: NotifyService, private router: Router) { }

    //get last order details:
    public async ngOnInit() {

        //get user from redux-auth-state:
        this.user = store.getState().authState.user;

        //get all orders by user:
        this.orders = await this.http.get<OrderModel[]>(environment.ordersByUserUrl + this.user.id).toPromise();
        
        this.lastOrder = this.orders.slice(-1);  
    }

    public async refreshCart() {

        //get user from redux-auth-state:
        this.user = store.getState().authState.user;

        try {
            //get cart by user-ID:
            this.cart = await this.http.get<CartModel>(environment.cartsByUserUrl + this.user.id).toPromise();
            store.dispatch(cartDownloadedAction(this.cart));
            this.cart.id = store.getState().cartsState.cart.id;
            await this.http.delete(environment.emptyCrtUrl + this.cart.id).toPromise();
            this.router.navigateByUrl("/products-by-category")
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    // Create Order Invoice PDF

    public async downloadPdf() {
        try {

            this.user = store.getState().authState.user;

            //get cart by user-ID:
            this.cart = await this.http.get<CartModel>(environment.cartsByUserUrl + this.user.id).toPromise();
            store.dispatch(cartDownloadedAction(this.cart));

            // get items by cart-id:
            this.items = await this.http.get<ItemModel[]>(environment.itemsByCartUrl + this.cart.id).toPromise();

            //display total price of all products:
            let totalPrice = [];
            for (let i = 0; i < this.items.length; i++) {
                totalPrice.push(this.items[i].generalPrice);
                this.finalPrice = totalPrice.reduce((sum, item) => sum + item, 0);
            }

            // get properties of order- by user:
            this.orders = await this.http.get<OrderModel[]>(environment.ordersByUserUrl + this.user.id).toPromise();
            for (let i = 0; i < this.orders.length; i++) {
                this.orderExecutionDate = this.orders[i].orderExecutionDate
                this.deliveryDate = this.orders[i].DeliveryDate;
                this.cityForDelivery = this.orders[i].city;
                this.streetForDelivery = this.orders[i].street;
            }

            //create PDF File for reception:
            let doc = new jsPDF();
            let pdfName = "Reception";
            doc.setFontSize(25);
            doc.setTextColor(100);
            doc.text(this.orderExecutionDate.substring(0,10) + "\n" + "\n" + "Reception for " + this.user.firstName + " " + this.user.lastName + "." + "\n" + "\n"
                + "You bought products at a final price of : " + " $" + this.finalPrice + ". " + "\n" + "\n" + "The products will be delivered to you on the date: "
                + "\n" + this.deliveryDate.substring(0,10) + "\n" + "\n" + "to Address: " + this.streetForDelivery + ", " + this.cityForDelivery + ". " + "\n" + "\n" + "Thank you for buying from us.", 5, 50);
            doc.save(pdfName + '.pdf')
        }
        catch (err) {
            this.notify.error(err);
        }


    }

}
