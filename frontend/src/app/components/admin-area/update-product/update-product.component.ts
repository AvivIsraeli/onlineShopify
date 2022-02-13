import { CategoryModel } from './../../../models/category.model';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
    public product: ProductModel = new ProductModel();
    public categories: CategoryModel[];
    public imageDisplay: any | ArrayBuffer;
    public imagesUrl = environment.imagesUrl;

    constructor(
        private myActivatedRoute: ActivatedRoute,
        private myProductsService: ProductsService,
        private notify: NotifyService,
        private http: HttpClient,
        private myRouter: Router) { }

    // get one product:
    async ngOnInit() {
        try {
            this.product.id = +this.myActivatedRoute.snapshot.params.id; // Take a route parameter named id.
            this.product = await this.myProductsService.getOneProduct(this.product.id);
            this.categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            console.log(this.product.imageName)
            this.imageDisplay = this.imagesUrl + this.product.imageName;
        }
        catch (err) {
            this.notify.error(err);
        }
    }

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

    public async updateProduct() {
        try {
            await this.myProductsService.updateProduct(this.product);
            this.notify.success("Product has been updated.");
            this.myRouter.navigateByUrl("/admin");
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
