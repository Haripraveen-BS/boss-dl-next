import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import middleware from './middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = store.dispatch;
