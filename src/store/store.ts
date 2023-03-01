import { configureStore } from "@reduxjs/toolkit";
import storeItemsSlice from "./storeItemsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: { storeItems: storeItemsSlice, user: userSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
