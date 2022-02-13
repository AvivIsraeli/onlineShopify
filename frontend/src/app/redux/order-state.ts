import { OrderModel } from '../models/order.model';

export class OrderState {
    public order: OrderModel[];
}

export enum OrderActionType {
    orderDownloaded = "orderDownloaded",
   orderAdded = "orderAdded"
}

export interface OrderAction {
    type: OrderActionType;
    payload: any;
}

export function orderDownloadedAction(order: OrderModel[]): OrderAction {
    return { type: OrderActionType.orderDownloaded, payload: order };
}

export function orderAddedAction(order: OrderModel):OrderAction {
    return { type: OrderActionType.orderAdded, payload: order };
}

export function orderReducer(currentState: OrderState = new OrderState(), action: OrderAction): OrderState {

    const newState = { ...currentState };

    switch (action.type) {
        case OrderActionType.orderDownloaded:
            newState.order = action.payload;
            break;
    }

    return newState;
}