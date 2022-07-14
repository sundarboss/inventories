import { ADD_CATEGORY, ADD_CATEGORY_FIELD, UPDATE_CATEGORY_VALUE, REMOVE_CATEGORY } from "../constants";

const initialState = {
    categories: []
};

export const categoryReducers = (state=initialState, action={}) => {
    switch(action.type) {
        case ADD_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] };
        case ADD_CATEGORY_FIELD:
            const index = state.categories.findIndex((category) => category.id === action.payload.id);
            const newArray = [...state.categories];
            newArray[index].fields = action.payload.fields;
            return {
                ...state,
                categories: newArray
            };
        case UPDATE_CATEGORY_VALUE:
            const catIndex = state.categories.findIndex((category) => category.id === action.payload.id);
            const newCatArray = [...state.categories];
            newCatArray[catIndex][action.payload.fieldType] = action.payload.fieldValue;
            return {
                ...state,
                categories: newCatArray
            };
        case REMOVE_CATEGORY:
            const filteredCategories = state.categories.filter((category) => category.id !== action.payload.id);
            return {
                ...state,
                categories: filteredCategories
            };
        default:
            return state;
    }
}