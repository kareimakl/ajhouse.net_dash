import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/v1";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
    // ✅ Get all categories (language dynamic)
    getCategories: builder.query({
      query: (lang = "ar") => `/categories?lang=${lang}`,
    }),

    // ✅ Get one category by ID
    getCategoryById: builder.query({
      query: ({ id, lang = "ar" }) => `/categories/${id}?lang=${lang}`,
    }),

    // ✅ Create a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
    }),

    // ✅ Update a category
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: updatedCategory,
      }),
    }),

    // ✅ Delete a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
