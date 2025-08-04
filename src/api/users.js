import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://api-gateway.camion-app.com";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = localStorage.getItem("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMGMwYzI3YS01MzQwLTQ1ODAtOGZjYy0zZDg3NDNkZWY2OWYiLCJlbWFpbCI6ImluZm9Aa2FyaWFrLmNvbSIsInBob25lIjoiKzIwMTA5MzM3ODY4MSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NDMxNjQ0OSwiZXhwIjoxNzU0OTIxMjQ5fQ.oBpeUCA50SkZqmUD9f7B5YfM5ZEboamMgrhFMUTCfFs";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
