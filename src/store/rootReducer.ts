import baseSlice from "@/reducers/baseSlice";
import baseService from "@/service/baseService";

const rootReducer = {
  application: baseSlice,
  [baseService.reducerPath]: baseService.reducer,

};

export default rootReducer;
