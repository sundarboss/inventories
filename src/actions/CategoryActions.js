import { ADD_CATEGORY, ADD_CATEGORY_FIELD, UPDATE_CATEGORY_VALUE } from "../constants";

export const addCategoryAction = (category) => {
    return {
        type: ADD_CATEGORY,
        payload: category
    }
}

export const addCategoryFieldAction = (fields, id) => {
    return {
        type: ADD_CATEGORY_FIELD,
        payload: {
            fields,
            id
        }
    }
}

export const updateCategoryValueAction = (id, fieldType, fieldValue) => {
    return {
        type: UPDATE_CATEGORY_VALUE,
        payload: {
            id,
            fieldType,
            fieldValue
        }
    }
}
