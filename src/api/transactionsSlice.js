import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/v1";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    // ✅ Get all contacts
    getContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),

    // ✅ Delete contact by ID
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateContactStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/contacts/${id}/status`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useUpdateContactStatusMutation,
} = transactionsApi;
