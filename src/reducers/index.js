import { combineReducers } from "redux";
import { categoryReducers } from "./CategoryReducers";

export const reducers = combineReducers({
    categories: categoryReducers
})