import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, REMOVE_CATEGORY } from "../constants";

const initialState = {
    items: []
}

export const itemReducers = (state=initialState, action={}) => {
    switch(action.type) {
        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };
        case UPDATE_ITEM:
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            const newFields = [...state.items[itemIndex].fields];
            const newArray = [...state.items];
            const newFieldIndex = newFields.findIndex((field) => field.name === action.payload.fieldName);
            newFields[newFieldIndex].value = action.payload.fieldValue;
            newArray[itemIndex].fields = [...newFields];
            return {
                ...state,
                items: newArray
            };
        case REMOVE_ITEM:
            const filteredItems = state.items.filter((item) => item.id !== action.payload);
            return {
                ...state,
                items: filteredItems
            };
        case REMOVE_CATEGORY:
            const newFilteredItems = state.items.filter((item) => item.type !== action.payload.name);
            return {
                ...action,
                items: newFilteredItems
            };
        default:
            return state;
    }
}