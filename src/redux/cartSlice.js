import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price;
        },
        clearCart: (state, action) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        updateProducts: (state, action) => {
            // state.products = action.payload;
            alert("ASDASASD");
        },
    },
});

export const {addProduct, clearCart, updateProducts} = cartSlice.actions;
export default cartSlice.reducer;