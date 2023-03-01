import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface userState {
  email: string | null;
  token: string | null;
  id: string | null;
  isLoggedIn: boolean;
}

const initialState: userState = {
  email: null,
  token: null,
  id: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onRegisterUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isLoggedIn = true;
    },
    onLogoutUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoggedIn = false;
      localStorage.removeItem("newUser");
      toast.info(<p className="text-center mt-3">You've been logged out.</p>, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError(state, action) {
      toast.error(action.payload, { position: toast.POSITION.TOP_CENTER });
    },
    setIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
  },
});

export const { onRegisterUser, onLogoutUser, onError, setIsLoggedIn } =
  userSlice.actions;

export default userSlice.reducer;
