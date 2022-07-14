import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, REMOVE_CATEGORY, ADD_ITEM_CATEGORY_FIELD, REMOVE_CATEGORY_FIELD } from "../constants";

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
                ...state,
                items: newFilteredItems
            };
        case ADD_ITEM_CATEGORY_FIELD:
            const updatedArray = state.items.map((item) => {
                if (item.type === action.payload.catName) {
                    const fieldIndex = item.fields.findIndex((field) => field.id === action.payload.newField.id);
                    if (fieldIndex > -1) {
                        item.fields[fieldIndex].name = action.payload.newField.name;
                        item.fields[fieldIndex].type = action.payload.newField.type;
                        item.fields[fieldIndex].value = '';
                    } else {
                        item.fields.push(action.payload.newField);
                    }
                }
                return item;
            })
            return {
                ...state,
                items: updatedArray
            }
        case REMOVE_CATEGORY_FIELD:
            const removeArray = state.items.map((item) => {
                if (item.type === action.payload.catName) {
                    const newFilteredFields = item.fields.filter((field) => field.id !== action.payload.fieldId)
                    item.fields = newFilteredFields;
                }
                return item;
            })
            return {
                ...state,
                items: removeArray
            }
        default:
            return state;
    }
}