import { combineReducers } from "redux";
import { categoryReducers } from "./CategoryReducers";
import { itemReducers } from "./ItemReducers";

export const reducers = combineReducers({
    categories: categoryReducers,
    items: itemReducers
})