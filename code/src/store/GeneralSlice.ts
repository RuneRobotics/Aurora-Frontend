import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode, Tab } from "../types/state_types.ts";

export interface State {
  mode: Mode;
  tab: Tab;
}
const initialState:State = {
  mode: Mode.Detection,
  tab: "Home"
};

const GeneralSlice = createSlice({
  name: "general_slice",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
    setTab: (state, action: PayloadAction<Tab>) => {
      state.tab = action.payload;
    },
  },
});

export const { setMode, setTab } = GeneralSlice.actions;
export default GeneralSlice.reducer;
