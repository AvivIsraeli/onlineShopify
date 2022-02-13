import { Location } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class BackButtonService {

    constructor(private location: Location) { }

    public backButton() {
        this.location.back();
    }
}
