import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

    public category = new CategoryModel();

    constructor(
        private myRouter: Router,
        private notify: NotifyService,
        private myProductsService: ProductsService
    ) { }

    //add product to server:
    public async addCategory() {
        try {
            await this.myProductsService.addCategory(this.category)
            this.notify.success("Category has been added! ");
            this.myRouter.navigateByUrl("/admin");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
