// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { loginApi, registerApi } from "../service/authService";
// import { errorMessage } from "../service/api";
// import { User } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../services/authService";
import { errorMessage } from "../services/api";
import type { User } from "../types";


interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  notice: string | null;
}

const stored = localStorage.getItem("user");
const initialState: AuthState = {
  user: stored ? (JSON.parse(stored) as User) : null,
  loading: false,
  error: null,
  notice: null,
};

export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, accessToken, refreshToken } = await loginApi(email, password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  }
);

export const register = createAsyncThunk<string, Parameters<typeof registerApi>[0], { rejectValue: string }>(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const res = await registerApi(body);
      return body.role === "RESCUER"
        ? "Account created. An admin must approve your rescuer account before you can log in."
        : res.message ?? "Account created. You can log in now.";
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.clear();
    },
    clearMessages(state) {
      state.error = null;
      state.notice = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a: PayloadAction<User>) => { s.loading = false; s.user = a.payload; })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload ?? "Login failed"; })
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; s.notice = null; })
      .addCase(register.fulfilled, (s, a) => { s.loading = false; s.notice = a.payload; })
      .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload ?? "Registration failed"; });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
