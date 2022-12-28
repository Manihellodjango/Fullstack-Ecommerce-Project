import { createSlice } from "@reduxjs/toolkit";

const data =
  localStorage.getItem("cart") !== null
    ? JSON.parse(String(localStorage.getItem("cart")))
    : [];

const initialCart = {
  cartItems: data
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart: (state, action) => { 
        state.cartItems.push(action.payload)
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload //@ts-ignore
      state.cartItems = state.cartItems.filter((cartItem) =>cartItem._id !== id)
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  },
    
  },
});

export const { addToCart,removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
