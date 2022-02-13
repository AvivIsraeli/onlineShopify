import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private myAuthService: AuthService, private myRouter: Router, private notify: NotifyService)   { }

    ngOnInit(): void {
      try {
          this.myAuthService.logout();
          this.myRouter.navigateByUrl("/login");
      }
      catch (err) {
          this.notify.error(err);
      }
    }

}
