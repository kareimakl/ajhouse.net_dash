import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL of your Laravel API
const baseUrl = "https://api-gateway.camion-app.com/affiliates";

export const couponsAll = createApi({
  reducerPath: "bookingsApi",
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
    // Get all bookings
    getBookings: builder.query({
      query: () => "/coupons/all",
    }),
    // Get a booking by ID
    getBookingById: builder.query({
      query: (id) => `/coupon/${id}`,
    }),
    // Create a new booking
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: "/admin/coupon",
        method: "POST",
        body: newBooking,
      }),
    }),
    // Update a booking
    updateBooking: builder.mutation({
      query: ({ id, ...updatedBooking }) => ({
        url: `/coupon/${id}`,
        method: "PUT",
        body: updatedBooking,
      }),
    }),
    // Delete a booking
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = couponsAll;
