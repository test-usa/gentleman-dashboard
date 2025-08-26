import { createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  id: string;
  role: string;
  username: string;
}

interface AuthState {
  accessToken: string | null;
  expires_in: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  expires_in: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action
    ) => {
      state.accessToken = action.payload.accessToken;
      state.expires_in = action.payload.expires_in;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.expires_in = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
