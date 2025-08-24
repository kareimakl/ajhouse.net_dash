import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL of your Laravel API
const baseUrl = "https://api-gateway.camion-app.com";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
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
    // Get all transactions
    getTransactions: builder.query({
      query: () => "/checkout",
    }),
    // Get transaction by ID
    getTransactionById: builder.query({
      query: (id) => `/show-transaction/${id}`,
    }),
    // Create new transaction
    createTransaction: builder.mutation({
      query: (newTransaction) => ({
        url: "/add-transaction",
        method: "POST",
        body: newTransaction,
      }),
    }),
    // Update transaction
    updateTransaction: builder.mutation({
      query: ({ id, ...updatedTransaction }) => ({
        url: `/update-transaction/${id}`,
        method: "PUT",
        body: updatedTransaction,
      }),
    }),
    // Delete transaction
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/delete-transaction/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
