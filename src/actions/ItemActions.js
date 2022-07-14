import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, ADD_ITEM_CATEGORY_FIELD } from "../constants";

export const addItemAction = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const updateItemAction = (id, fieldName, fieldValue) => {
    return {
        type: UPDATE_ITEM,
        payload: {
            id,
            fieldName,
            fieldValue
        }
    }
}

export const removeItemAction = (id) => {
    return {
        type: REMOVE_ITEM,
        payload: id
    }
}

export const addItemCategoryAction = (newField, catName) => {
    return {
        type: ADD_ITEM_CATEGORY_FIELD,
        payload: {
            newField,
            catName
        }
    }
}