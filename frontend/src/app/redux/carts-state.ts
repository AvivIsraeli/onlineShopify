import { CartModel } from './../models/cart.model';

//Carts State: 
export class CartsState {
    public cart: CartModel;
}

// Cart Action Types:
export enum CartActionType {
    cartsDownloaded = "cartsDownloaded",
    cartAdded = "cartAdded"
}

// Cart Action: 
export interface CartAction {
    type: CartActionType;
    payload: any;
}

// Cart Action Creators: 
export function cartDownloadedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartsDownloaded, payload: cart };
}
export function cartAddedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartAdded, payload: cart };
}


// Carts Reducer:
export function cartReducer(currentState: CartsState = new CartsState(), action: CartAction): CartsState {

    const newState = { ...currentState };

    switch (action.type) {
        case CartActionType.cartsDownloaded:
            newState.cart = action.payload;
            break;
        case CartActionType.cartAdded:
            newState.cart = action.payload;
            break;
    }


    return newState;
}