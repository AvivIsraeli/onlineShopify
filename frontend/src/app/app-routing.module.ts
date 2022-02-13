import { OrderHistoryComponent } from './components/orders-area/order-history/order-history.component';
import { CartByUserComponent } from './components/cart-area/cart-by-user/cart-by-user.component';
import { ProductsByCategoryComponent } from './components/products-area/products-by-category/products-by-category.component';
import { AuthGuard } from './services/auth.guard';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { AllProductsComponent } from './components/admin-area/all-products/all-products.component';
import { Page404Component } from './components/shared-area/page404/page404.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AdminGuard } from './services/admin.guard';
import { AddOrderComponent } from './components/orders-area/add-order/add-order.component';
import { OrderSummaryComponent } from './components/orders-area/order-summary/order-summary.component';
import { AboutComponent } from './components/about-area/about/about.component';
import { AddCategoryComponent } from './components/admin-area/add-category/add-category.component';

const routes: Routes = [
    { path: "admin", canActivate: [AdminGuard], component: AllProductsComponent },
    { path: "products-by-category", component: ProductsByCategoryComponent },
    { path: "add-product", component: AddProductComponent },
    { path: "add-category", component: AddCategoryComponent },
    { path: "cart-by-user", canActivate: [AuthGuard], component: CartByUserComponent },
    { path: "order",  canActivate: [AuthGuard], component: AddOrderComponent },
    { path: "order-history",  canActivate: [AuthGuard], component: OrderHistoryComponent },
    { path: "thanks", component: OrderSummaryComponent },
    { path: "about", component: AboutComponent },
    { path: "update-product/:id", component: UpdateProductComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "", redirectTo: "/products-by-category", pathMatch: "full" },
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
