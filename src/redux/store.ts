import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import storeReducer from "./reducers/storeSlice";
import cartReducer from "./reducers/cartSlice";
 

const store = configureStore({
  reducer: {
    // @ts-ignore
    auth: authReducer,
    // @ts-ignore
    storeData: storeReducer,
    // @ts-ignore
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
