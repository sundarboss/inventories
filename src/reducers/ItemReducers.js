import { 
    ADD_ITEM, 
    UPDATE_ITEM, 
    REMOVE_ITEM, 
    REMOVE_CATEGORY, 
    ADD_ITEM_CATEGORY_FIELD, 
    REMOVE_CATEGORY_FIELD 
} from "../constants";

const initialState = {
    items: []
}

export const itemReducers = (state=initialState, action={}) => {
    switch(action.type) {
        //Add a new Inventory item
        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };
        //Update field values for an inventory item
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
        //Remove an inventory item
        case REMOVE_ITEM:
            const filteredItems = state.items.filter((item) => item.id !== action.payload);
            return {
                ...state,
                items: filteredItems
            };
        //Remove all the inventory items that are under a Inventory type which was deleted
        case REMOVE_CATEGORY:
            const newFilteredItems = state.items.filter((item) => item.type !== action.payload.name);
            return {
                ...state,
                items: newFilteredItems
            };
        //Update inventory items under a specific category with the newly added field for the Inventory type
        case ADD_ITEM_CATEGORY_FIELD:
            const updatedArray = state.items.map((item) => {
                if (item.type === action.payload.catName) {
                    const fieldIndex = item.fields.findIndex((field) => field.id === action.payload.newField.id);
                    if (fieldIndex > -1) {
                        item.fields[fieldIndex].name = action.payload.newField.name;
                        item.fields[fieldIndex].type = action.payload.newField.type;
                        item.fields[fieldIndex].value = '';
                    } else {
                        const newField = {};
                        newField.id = action.payload.newField.id;
                        newField.name = action.payload.newField.name;
                        newField.type = action.payload.newField.type;
                        newField.value = '';
                        item.fields.push(newField);
                    }
                }
                return item;
            })
            return {
                ...state,
                items: updatedArray
            }
        //Remove the deleted Inventory type field from all the inevntory items that are under that inventory type
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