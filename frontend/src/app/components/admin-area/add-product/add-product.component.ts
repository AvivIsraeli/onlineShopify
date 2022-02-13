import { CategoryModel } from './../../../models/category.model';
import { NotifyService } from './../../../services/notify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    public product = new ProductModel();
    public categories: CategoryModel[];
    public imageDisplay: any | ArrayBuffer;

    constructor(
        private myRouter: Router,
        private notify: NotifyService,
        private myProductsService: ProductsService,
    ) { }

    //get all categories:
    async ngOnInit() {
        try {
            this.categories = await this.myProductsService.getAllCategories();
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    //save image into product:
    public saveImage(args: any): void {
        this.product.image = (args.target as HTMLInputElement).files;
        const file = args.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            }
            fileReader.readAsDataURL(file);
        }
    }

    //add product to server:
    public async addProduct() {
        try {
            await this.myProductsService.addProduct(this.product)
            this.notify.success("Product has been added! ");
            this.myRouter.navigateByUrl("/admin");
        }
        catch (err) {
            this.notify.error(err);
        }
    }



}
