import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor(private myRouter: Router, private notify: NotifyService) { }

    public canActivate(): boolean {

        // If user is logged-in: 
        if (store.getState().authState.user)
            return true; // You can enter the route

        // If user isn't logged-in:
        this.notify.error("You must be logged in !");
        this.myRouter.navigateByUrl("/login");
        return false; // You can't enter the route
    }

}
