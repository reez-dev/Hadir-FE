import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "./features/counter/counter_slice";
import { DashboardSlice } from "./features/dashboard/dashboard_slice";
import { BoolSlice } from "./features/generic/bool_slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice.reducer,
      dashboard: DashboardSlice.reducer,
      bool: BoolSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
