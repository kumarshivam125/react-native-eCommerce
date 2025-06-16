import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
    cart: cartSlice,
    user:userSlice
})

export const store = configureStore({ 
    reducer: rootReducer 
});
export default rootReducer;
