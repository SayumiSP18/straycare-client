// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Lang = "en" | "si";
const saved = localStorage.getItem("lang");

const langSlice = createSlice({
  name: "lang",
  initialState: { lang: (saved === "si" ? "si" : "en") as Lang },
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
