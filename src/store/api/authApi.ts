import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    bootStrap: builder.query<unknown, void>({
      query: () => ({
        url: "/auth/bootstrap",
        method: "POST",
      }),
      providesTags: ["Auth"],
    }),

    getMe: builder.query<unknown, void>({
      query: () => "/users/me",
      providesTags: ["Auth"],
    }),

    updateProfile: builder.mutation<unknown, { displayName: string }>({
      query: (body) => ({
        url: "/users/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useBootStrapQuery, useGetMeQuery, useUpdateProfileMutation } =
  authApi;
