import { ItemModel } from './../models/item.model';

export class ItemsState {
    public items: ItemModel[];
}

export enum ItemActionType {
    itemsDownloaded = "itemsDownloaded",
    itemAdded = "itemAdded"
}

export interface ItemAction {
    type: ItemActionType;
    payload: any;
}

export function itemDownloadedAction(items: ItemModel[]): ItemAction {
    return { type: ItemActionType.itemsDownloaded, payload: items };
}
export function itemAddedAction(item: ItemModel): ItemAction {
    return { type: ItemActionType.itemAdded, payload: item };
}

export function itemReducer(currentState: ItemsState = new ItemsState(), action: ItemAction): ItemsState {

    const newState = { ...currentState };

    switch (action.type) {
        case ItemActionType.itemsDownloaded:
            newState.items = action.payload;
            break;
        case ItemActionType.itemAdded:
            newState.items = action.payload;
            break;
    }
    
    return newState;
}