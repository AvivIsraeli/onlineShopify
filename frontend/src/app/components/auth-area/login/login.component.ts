import { NotifyService } from './../../../services/notify.service';
import { AuthService } from './../../../services/auth.service';
import { CredentialsModel } from './../../../models/credentials.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();

    constructor(
        private myAuthService: AuthService,
        private myRouter: Router,
        private notify: NotifyService,

    ) { }

    public async login() {
        try {
            await this.myAuthService.login(this.credentials);
            this.myRouter.navigateByUrl("/products-by-category");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
