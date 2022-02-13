import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import store from 'src/app/redux/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
    
    public orders: OrderModel[];
    public user: UserModel;

    constructor(private http: HttpClient) { }


    public async ngOnInit() {
        //get user from redux-auth-state:
        this.user = store.getState().authState.user;
        //get all orders by user:
        this.orders = await this.http.get<OrderModel[]>(environment.ordersByUserUrl + this.user.id).toPromise(); 
    }


}
