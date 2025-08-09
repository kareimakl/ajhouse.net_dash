import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api-gateway.camion-app.com";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
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
        method: "PATCH",
        body: updatedUser,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id, deleteUser) => ({
        url: `/users/${id}`,
        method: "DELETE",
        body: deleteUser,
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
