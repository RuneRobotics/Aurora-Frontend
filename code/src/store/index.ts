import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./CoProcessorSlice";
import generalReducer from "./GeneralSlice";
export const store = configureStore({
  reducer: {
    device_slice: deviceReducer,
    general_slice: generalReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
