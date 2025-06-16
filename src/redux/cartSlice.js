import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    catalog:[]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCatalog: (state, action) => {
            state.catalog=action.payload
        },
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload);
            state.cart = state.cart.map(x => x.id == action.payload.id ? { ...x, qty: 1 } : x);
            state.catalog = state.catalog.map(x => x.id == action.payload.id ? { ...x, qty:x.qty+1 } : x);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
            state.catalog = state.catalog.map(x => x.id == action.payload ? { ...x, qty:0 } : x);
        },
        increment: (state, action) => {
            state.cart = state.cart.map(x => x.id == action.payload ? { ...x, qty: x.qty + 1 } : x);
            state.catalog = state.catalog.map(x => x.id == action.payload ? { ...x, qty: x.qty + 1 } : x);
        },
        decrement: (state, action) => {
            state.cart = state.cart.map(x => x.id == action.payload ? { ...x, qty: x.qty - 1 } : x);
            state.catalog = state.catalog.map(x => x.id == action.payload ? { ...x, qty: x.qty - 1 } : x);
        }
    }
})
export const { setCatalog,addToCart, removeFromCart, increment, decrement,setCart } = cartSlice.actions
export default cartSlice.reducer;