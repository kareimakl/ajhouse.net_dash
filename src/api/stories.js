import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL of your Laravel API
const baseUrl = "http://stories.camion-app.com:3001";

// Create the API slice for countries
export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMGMwYzI3YS01MzQwLTQ1ODAtOGZjYy0zZDg3NDNkZWY2OWYiLCJlbWFpbCI6ImluZm9Aa2FyaWFrLmNvbSIsInBob25lIjoiKzIwMTA5MzM3ODY4MSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDMxNjQ0OSwiZXhwIjoxNzU0OTIxMjQ5fQ.oBpeUCA50SkZqmUD9f7B5YfM5ZEboamMgrhFMUTCfFs";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Fetch all countries (GET)
    getCountries: builder.query({
      query: () => "/stories",
    }),

    // Get a single country by ID (GET)
    getCountryById: builder.query({
      query: (id) => `/stories/${id}`,
    }),

    // Create a new country (POST)
    createCountry: builder.mutation({
      query: (newCountry) => ({
        url: "/stories",
        method: "POST",
        body: newCountry,
      }),
    }),

    // Update an existing country (PUT)
    updateCountry: builder.mutation({
      query: ({ id, updatedCountry }) => ({
        url: `/stories/${id}`,
        method: "PUT",
        body: updatedCountry,
      }),
    }),

    // Delete a country (DELETE)
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `/stories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the hooks generated for the endpoints
export const {
  useGetCountriesQuery,
  useGetCountryByIdQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;
