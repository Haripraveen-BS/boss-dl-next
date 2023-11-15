import { baseQueryWithReauth } from "./baseQuery";
import {
    createApi
} from "@reduxjs/toolkit/query/react";

const baseService = createApi({
    reducerPath: "baseService",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({

    }),
});
export default baseService;