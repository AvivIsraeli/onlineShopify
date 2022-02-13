import { ProductModel } from "./product.model";

export class ItemModel {
    public id: number;
    public cartId: number;
    public productId: number;
    public amount: number;
    public generalPrice: number;
    public productName: string;
    public price: number;
    public product: ProductModel;
}