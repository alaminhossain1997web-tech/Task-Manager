import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "https://taskcreateapp-backend.onrender.com",
    credentials: "include", 
  }),
  tagTypes: ["Profile", "Projects"],
  endpoints: (build) => ({
    registration: build.mutation({
      query: (registerData) => ({
        url: "/auth/registration",
        method: "POST",
        body: registerData,
      }),
    }),

    verifyOtp: build.mutation({
      query: (otpData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: otpData,
      }),
    }),

    login: build.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Profile"],
    }),

    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Profile", "Projects"],
    }),

    getProfile: build.query({
      query: () => "/auth/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: build.mutation({
      query: (formData) => ({
        url: "/auth/update-profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    createProject: build.mutation({
      query: (projectData) => ({
        url: "/projects/create",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Projects"],
    }),

    getProjectList: build.query({
      query: () => "/projects/list",
      providesTags: ["Projects"],
    }),

    addProjectMember: build.mutation({
      query: (memberData) => ({
        url: "/projects/add",
        method: "POST",
        body: memberData,
      }),
      invalidatesTags: ["Projects"],
    }),

    addProjectTask: build.mutation({
      query: (taskData) => ({
        url: "/projects/addtask",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateProjectMutation,
  useGetProjectListQuery,
  useAddProjectMemberMutation,
  useAddProjectTaskMutation,
} = apiService;