import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL of your Laravel API
const baseUrl = "https://api-gateway.camion-app.com";

// Create the API slice for analysis
export const analysisApi = createApi({
  reducerPath: "analysisApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ✅ Orders completed count
    getOrdersCompletedCount: builder.query({
      query: () => "/checkout/count/completed",
    }),
    // ✅ Orders cancelled count
    getOrdersCancelledCount: builder.query({
      query: () => "/checkout/count/cancelled",
    }),

    // ✅ Orders pending count
    getOrdersPendingCount: builder.query({
      query: () => "/checkout/count/pending",
    }),

    // ✅ Affiliate coupons count
    getAffiliateCouponsCount: builder.query({
      query: () => "/affiliates/count/coupons",
    }),

    // ✅ Affiliates total count
    getAffiliatesCount: builder.query({
      query: () => "/affiliates/count/approved",
    }),

    // ✅ Affiliates pending count
    getAffiliatesPendingCount: builder.query({
      query: () => "/affiliates/count/pending",
    }),

    // ✅ Affiliates rejected count
    getAffiliatesRejectedCount: builder.query({
      query: () => "/affiliates/count/rejected",
    }),

    // ✅ Users total count
    getUsersCount: builder.query({
      query: () => "/users/count/all",
    }),
  }),
});

// Export hooks
export const {
  useGetOrdersCompletedCountQuery,
  useGetOrdersCancelledCountQuery,
  useGetOrdersPendingCountQuery,
  useGetAffiliateCouponsCountQuery,
  useGetAffiliatesCountQuery,
  useGetAffiliatesPendingCountQuery,
  useGetAffiliatesRejectedCountQuery,
  useGetUsersCountQuery,
} = analysisApi;
