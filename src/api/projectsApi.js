// src/api/projectsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (lang = "ar") => `/projects?lang=${lang}`,
    }),

    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
    }),

    createProject: builder.mutation({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
    }),

    updateProject: builder.mutation({
      query: ({ id, updatedProject }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: updatedProject,
      }),
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
