import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    public remove(): void {
        const toggle = document.getElementById('toggle');
        const sideNav = document.getElementById('sideNav')
        toggle.classList.remove("active");
        sideNav.classList.remove("active");
    }

}
