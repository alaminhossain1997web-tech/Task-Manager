import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (registerData) => ({
        url: "/auth/registration",
        method: "POST",
        body: registerData,
      }),
    }),

    login: build.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getProfile: build.query({
      query: (userData) => "/auth/profile",
    }),
    getProjectList: build.query({
    query:() => "/projects/list"
  })
  }),
});

export const { useRegistrationMutation, useLoginMutation, useGetProfileQuery,useLogoutMutation,useGetProjectListQuery } =
  apiService;
