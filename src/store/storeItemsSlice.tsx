import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks/hook";
import { Item } from "../models/Item";
import { User } from "../models/User";
import { RootState } from "./store";

interface initialStateProps {
  storeItems: Item[];
  cartItems: Item[];
  totalQuantity: number;
  totalPrice: number;
  orders: { usersOrder: Item[]; totalPrice: number; orderNumber: number }[];
}

const initialState: initialStateProps = {
  storeItems: [],
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  orders: [],
};

export const addOrder = createAsyncThunk(
  "items/addOrder",
  async (userData: User, { getState }) => {
    const appState = getState() as RootState;
    const usersOrder = appState.storeItems.cartItems;
    const totalPrice = usersOrder.reduce((sum, item) => item.price + sum, 0);
    const orderNumber = Math.floor(Math.random() * 1000000);

    console.log(usersOrder);

    const response = await fetch(
      "https://sneakertestproject-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: { usersOrder, totalPrice },
        }),
      }
    );
    return { usersOrder, totalPrice, orderNumber };
  }
);

const storeItemsSlice = createSlice({
  name: "storeItems",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Item>) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems = [
          ...state.cartItems,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            imgUrl: action.payload.imgUrl,
            quantity: action.payload.quantity,
          },
        ];
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    deleteFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const targetItem = state.cartItems.find((item) => item.id === id);
      if (targetItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalPrice = state.totalPrice - targetItem.price;
        state.totalQuantity--;
      } else if (targetItem) {
        targetItem.quantity--;
        state.totalPrice = state.totalPrice - targetItem.price;
        state.totalQuantity--;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCartItems(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCartItems(state, action: PayloadAction<Item[]>) {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.orders = [...state.orders, action.payload];
      console.log(state.orders);

      toast.success("Thank you for your order!", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  },
});

export const { addToCart, deleteFromCart, clearCartItems, setCartItems } =
  storeItemsSlice.actions;
export default storeItemsSlice.reducer;
