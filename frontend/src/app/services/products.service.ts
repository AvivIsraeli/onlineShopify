import { ProductModel } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { categoriesDownloadedAction, categoryAddedAction } from '../redux/categories-state';
import { productAddedAction, productsDownloadedAction, productUpdatedAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    // Get all products: 
    public async getAllProducts() {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().productsState.products;
    }

    // Get all categories: 
    public async getAllCategories() {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        return store.getState().categoriesState.categories;
    }

    // Get one product: 
    // Get one product: 
    public async getOneProduct(id: number) {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().productsState.products.find(p => p.id === id);
        return product;
    }

    // // Add category: 
    public async addCategory(category: CategoryModel) {
        const addedCategory= await this.http.post<CategoryModel>(environment.categoriesUrl, category).toPromise();
        store.dispatch(categoryAddedAction(addedCategory));
        return addedCategory;
    }
    
    // // Add product: 
    public async addProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
        store.dispatch(productAddedAction(addedProduct));
        return addedProduct;
    }

    // Update product: 
    public async updateProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product.id, myFormData).toPromise();
        store.dispatch(productUpdatedAction(updatedProduct));
        return updatedProduct;
    }

    
   

}
