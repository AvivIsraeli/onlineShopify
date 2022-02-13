import { ProductsService } from './../../../services/products.service';
import { CategoryModel } from './../../../models/category.model';
import { NotifyService } from './../../../services/notify.service';
import { ProductModel } from './../../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-products-by-category',
    templateUrl: './products-by-category.component.html',
    styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {


    public imageUrl = environment.imagesUrl;
    public textToSearch: string;
    public categories: CategoryModel[];
    public products: ProductModel[];
    constructor(private http: HttpClient, private notify: NotifyService, private myProductsService: ProductsService) { }


    async ngOnInit() {

        try {
            //get all products in separate route:
            this.products = await this.myProductsService.getAllProducts();

            // get all categories links:
            this.categories = await this.myProductsService.getAllCategories()
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    // get products by category:
    public async productsByCategory(category: CategoryModel) {

        try {
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + category.id).toPromise();
            this.textToSearch = ""
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    // search product:
    public async searchProduct() {
        try {
            if (this.textToSearch === "" || !this.textToSearch) {
                const Search = document.getElementById("search");
                Search.style.backgroundColor = "red";
                Search.focus();
                event.preventDefault();
                return;
            }
            else {
                const search = document.getElementById("search");
                search.style.backgroundColor = "white";
                this.products = await this.http.get<ProductModel[]>(environment.searchUrl + this.textToSearch).toPromise();
                
            }
        }
        catch (err) {
            this.notify.error(err);
        }
    }

    // clear input-search and reset the data-table:
    public async getAllProducts() {
        try {
            this.textToSearch = "";
            this.products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
        }
        catch (err) {
            this.notify.error(err);
        }
    }


}
