import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL of your Laravel API
const baseUrl = "https://stories.camion-app.com";

// Create the API slice for countries
export const countriesApi = createApi({
  reducerPath: "countriesApi",
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
    // Fetch all countries (GET)
    getCountries: builder.query({
      query: () => "stories/active",
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
