import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/auth",
    credentials: "include",
  }),
  endpoints: (build) => ({
    registration: build.mutation({
      query: (registerData) => ({
        url: "/registration",
        method: "POST",
        body: registerData,
      }),
    }),

    login: build.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = apiService;
