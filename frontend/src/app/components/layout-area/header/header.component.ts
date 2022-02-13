import { environment } from './../../../../environments/environment';
import { CartModel } from './../../../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { BackButtonService } from 'src/app/services/back-button.service';
import { ItemModel } from 'src/app/models/item.model';
import { UserModel } from 'src/app/models/user.model';
import { itemDownloadedAction } from 'src/app/redux/items-state';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAdmin: boolean;
    public items: ItemModel[];
    public totalItems: number;
    public user: UserModel;
    public cart: CartModel;

    private unsubscribeMe: Unsubscribe;

    constructor(private backButtonService: BackButtonService, private http: HttpClient, private notify: NotifyService) { }

    ngOnInit() {


        this.unsubscribeMe = store.subscribe(() => {
            this.isAdmin = store.getState().authState.user?.isAdmin;
        });

        store.subscribe(() => {
            if(store.getState().authState.user) this.TotalItems();
        })



    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }



    public async TotalItems() {
        try {
            //get user from redux-auth-state:
            this.user = store.getState().authState.user;

            //get cart by user-ID:
            this.cart = await this.http.get<CartModel>(environment.cartsByUserUrl + this.user.id).toPromise();

            // get items by cart-id:
            this.items = await this.http.get<ItemModel[]>(environment.itemsByCartUrl + this.cart.id).toPromise();

            this.totalItems = this.items.length;

        }
        catch (err) {
            this.notify.error(err);
        }
    }

    public toggle(): void {
        const toggle = document.getElementById('toggle');
        const sideNav = document.getElementById('sideNav')
        toggle.classList.toggle("active");
        sideNav.classList.toggle("active");
    }

    public remove(): void {
        const toggle = document.getElementById('toggle');
        const sideNav = document.getElementById('sideNav')
        toggle.classList.remove("active");
        sideNav.classList.remove("active");
    }

    public back() {
        this.backButtonService.backButton();
    }





}
