import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { homeQuery } from "@/components/home/homeQuery";
import { OrderListResponse } from "@/constants/types";

interface Store {
  activeTabId: string;
  orderList: OrderListResponse[];
}
const initialState: Store = {
  activeTabId: "1",
  orderList: [],
};
const { orderList } = homeQuery.endpoints;
const rejectedList = isAnyOf(orderList.matchRejected);
const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(orderList.matchFulfilled, (state: any, action: any) => {
      const { data } = action.payload;
      state.orderList = data;
    });
    builder.addMatcher(rejectedList, (state: any, action: any) => {
      console.log("error : ", action.payload);
    });
  },
});
export const { setActiveTab } = baseSlice.actions;
export default baseSlice.reducer;
