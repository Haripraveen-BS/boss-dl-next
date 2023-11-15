import api from "@/service/baseService";

export const homeQuery = api.injectEndpoints({
  endpoints: (builder) => ({
    orderList: builder.query({
      query: (id) => ({
        url: `/listingSearch/${id}`,
      }),
    }),
    userDelete: builder.mutation({
      query: (payload) => ({
        url: "",
        body: payload,
        method: "DELETE",
      }),
    }),
    // userRegister: builder.mutation({
    //   query: (payload) => ({
    //     url: "",
    //     body: payload,
    //     method: "POST",
    //   }),
    // }),
    // userUpdate: builder.mutation({
    //   query: (payload) => ({
    //     url: "",
    //     body: payload,
    //     method: "PUT",
    //   }),
    // }),
  }),
});

export const {
  useOrderListQuery,
  useLazyOrderListQuery,
  useUserDeleteMutation,
  //   useLazyUserListQuery,
  //   useUserListQuery,
  //   useUserDeleteMutation,
  //   useUserUpdateMutation,
  //   useUserRegisterMutation,
} = homeQuery;
