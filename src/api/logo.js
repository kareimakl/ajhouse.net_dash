import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/v1";

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Add Authorization token if needed
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch all faqs (GET)
    getFaqs: builder.query({
      query: () => "/admin/settings/logo",
    }),

    // Create a new faq (POST)
    createFaq: builder.mutation({
      query: (newFaq) => ({
        url: "/auth/login",
        method: "POST",
        body: newFaq,
      }),
    }),
  }),
});

// Export the hooks generated for the endpoints
export const { useGetFaqsQuery, useCreateFaqMutation } = faqApi;
