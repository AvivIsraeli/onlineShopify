import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public user = new UserModel();
    public newCart = new CartModel();


    constructor(
        private myAuthService: AuthService,
        private myRouter: Router,
        private notify: NotifyService,
        private myCartService: CartsService
    ) { }

    public async register() {
        try {
            await this.myAuthService.register(this.user);
            this.notify.success("You are registered.");
            const user = store.getState().authState.user;
            this.newCart.userId = user.id
            //get Date:
            let currentDate = new Date().toJSON().slice(0, 10)
            //validation date:
            this.newCart.date = currentDate;
            await this.myCartService.addCart(this.newCart);
            this.myRouter.navigateByUrl("/products-by-category");
        }
        catch (err) {
            this.notify.error(err);
        }
    }
}
