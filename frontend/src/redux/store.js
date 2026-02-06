import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice"
import checkoutReducer from "./slices/checkoutSlice"
import orderReducer from './slices/orderSlice'
import adminRedcuer from './slices/adminSlice'
import adminProductReducer from './slices/adminProductSlice'
import adminOrderReducer from './slices/adminOrderSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    orders:orderReducer,
    admin:adminRedcuer,
    adminProducts:adminProductReducer,
    adminOrder:adminOrderReducer,

  },
});
export default store;
