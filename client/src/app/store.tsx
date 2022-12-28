import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "../features/userSlice";
import cartReducer from "../features/cartSlice"

const store = configureStore({
  reducer: {
    user: useReducer,
    cart:cartReducer
  },
});
export default store;