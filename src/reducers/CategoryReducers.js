import { 
    ADD_CATEGORY, 
    ADD_CATEGORY_FIELD, 
    UPDATE_CATEGORY_VALUE, 
    REMOVE_CATEGORY, 
    REMOVE_CATEGORY_FIELD 
} from "../constants";

const initialState = {
    categories: []
};

export const categoryReducers = (state=initialState, action={}) => {
    switch(action.type) {
        //Add a new Inventory type
        case ADD_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] };
        //Add a new field to the Inventory type and also update the field values for an inventory type
        case ADD_CATEGORY_FIELD:
            const index = state.categories.findIndex((category) => category.id === action.payload.id);
            const newArray = [...state.categories];
            newArray[index].fields = action.payload.fields;
            return {
                ...state,
                categories: newArray
            };
        //Update Object name and Object Title values for an Inventory Type
        case UPDATE_CATEGORY_VALUE:
            const catIndex = state.categories.findIndex((category) => category.id === action.payload.id);
            const newCatArray = [...state.categories];
            newCatArray[catIndex][action.payload.fieldType] = action.payload.fieldValue;
            return {
                ...state,
                categories: newCatArray
            };
        //Remove an Inventory type
        case REMOVE_CATEGORY:
            const filteredCategories = state.categories.filter((category) => category.id !== action.payload.id);
            return {
                ...state,
                categories: filteredCategories
            };
        //Remove a specific field from an Inventory type
        case REMOVE_CATEGORY_FIELD:
            const removeIndex = state.categories.findIndex((category) => category.id === action.payload.id);
            const updatedArray = [...state.categories];
            const updatedFields = [...updatedArray[removeIndex].fields];
            const filteredFields = updatedFields.filter((field) => field.id !== action.payload.fieldId);
            updatedArray[removeIndex].fields = filteredFields;
            return {
                ...state,
                categories: updatedArray
            }
        default:
            return state;
    }
}