
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AllProductsComponent } from './components/admin-area/all-products/all-products.component';
import { SpinnerComponent } from './components/shared-area/spinner/spinner.component';
import { Page404Component } from './components/shared-area/page404/page404.component';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ProductsByCategoryComponent } from './components/products-area/products-by-category/products-by-category.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { CartByUserComponent } from './components/cart-area/cart-by-user/cart-by-user.component';
import { AddOrderComponent } from './components/orders-area/add-order/add-order.component';
import { OrderSummaryComponent } from './components/orders-area/order-summary/order-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderHistoryComponent } from './components/orders-area/order-history/order-history.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AddCategoryComponent } from './components/admin-area/add-category/add-category.component';





@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        AllProductsComponent,
        SpinnerComponent,
        Page404Component,
        AddProductComponent,
        UpdateProductComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AuthMenuComponent,
        ProductsByCategoryComponent,
        ProductCardComponent,
        CartByUserComponent,
        AddOrderComponent,
        OrderSummaryComponent,
        OrderHistoryComponent,
        AboutComponent,
        AddCategoryComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
    ],
    providers: [
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS, // Register the interceptor
            useClass: JwtInterceptor, // Our interceptor class
            multi: true, // Can register it several times if needed

        }],
    bootstrap: [LayoutComponent]

})
export class AppModule { }
