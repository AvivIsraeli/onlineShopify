import { CategoryModel } from "../models/category.model";

// Categories State: 
export class CategoriesState {
    public categories: CategoryModel[] = [];
}

// Category Action Types:
export enum CategoryActionType {
    categoriesDownloaded = "categoriesDownloaded",
    categoryAdded = "categoryAdded",
    categoryUpdated = "categoryUpdated",
    categoryDeleted = "categoryDeleted"
}

// Category Action: 
export interface CategoryAction {
    type: CategoryActionType;
    payload: any;
}

// Category Action Creators: 
export function categoriesDownloadedAction(categories: CategoryModel[]): CategoryAction {
    return { type:CategoryActionType.categoriesDownloaded, payload: categories };
}
export function categoryAddedAction(category: CategoryModel): CategoryAction {
    return { type: CategoryActionType.categoryAdded, payload: category };
}
export function categoryUpdatedAction(category: CategoryModel): CategoryAction {
    return { type:CategoryActionType.categoryUpdated, payload: category };
}
export function categoryDeletedAction(id: number): CategoryAction {
    return { type:CategoryActionType.categoryDeleted, payload: id };
}

// Categories Reducer:
export function categoriesReducer(currentState: CategoriesState = new CategoriesState(), action: CategoryAction): CategoriesState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CategoryActionType.categoriesDownloaded: 
            newState.categories = action.payload;
            break;
        case CategoryActionType.categoryAdded:
            newState.categories.push(action.payload);
            break;
        case CategoryActionType.categoryUpdated: { 
            const index = newState.categories.findIndex(c => c.id === action.payload.id);
            newState.categories[index] = action.payload;
            break;
        }
        case CategoryActionType.categoryDeleted: { 
            const index = newState.categories.findIndex(c => c.id === action.payload);
            newState.categories.splice(index, 1);
            break;
        }
    }

    return newState;
}