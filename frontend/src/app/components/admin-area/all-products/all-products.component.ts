import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

    public products: ProductModel[];
    public imageUrl = environment.imagesUrl;
    public product: ProductModel;
    public textToSearch: string;

    constructor(
        private http: HttpClient,
        private notify: NotifyService,
        private myProductsService: ProductsService,
        private confirmationService: ConfirmationService,

    ) { }

    //Get All Products:
    async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProducts();
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    // search product:
    public async searchProduct() {
        try {
            if (this.textToSearch === "" || !this.textToSearch) {
                this.notify.error("The Product was Not found!");
                return;
            }
            else {
                this.products = await this.http.get<ProductModel[]>(environment.searchUrl + this.textToSearch).toPromise();
            }
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    // clear input-search and reset the data-table:
    public async clearInputSearch() {
        try {
            this.textToSearch = "";
            this.products = await this.myProductsService.getAllProducts();
        }
        catch (err) {
            this.notify.error(err);
        }
    }


    //Delete product:
    public async deleteProduct(id: number) {
        try {
            this.confirmationService.confirm({
                message: ' Do you agree to delete this product from the system permanently?',
                header: 'Delete Product From the System',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                     this.http.delete(environment.productsUrl + id).toPromise();
            const index = this.products.findIndex(p => p.id === id);
            this.products.splice(index, 1);
            this.notify.success("The item was successfully deleted from the system!")
                },
                reject: () => { }
            });

        }


        catch (err) {
            this.notify.error(err);
        }
    }

}
