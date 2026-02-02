import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";
import { Address, AddressInput } from "../../types";
import {
  AddressMutationApiResponse,
  GetAddressApiResponse,
  GetAddressesApiResponse,
} from "../types";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    // GET /addresses
    getAddresses: builder.query<Address[], void>({
      query: () => "/addresses",
      providesTags: ["Address"],
      transformResponse: (res: GetAddressesApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to fetch addresses");
      },
    }),

    // GET /addresses/:id
    getAddressById: builder.query<Address, string>({
      query: (id) => `/addresses/${id}`,
      transformResponse: (res: GetAddressApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to fetch address");
      },
    }),

    // POST /addresses
    createAddress: builder.mutation<Address, AddressInput>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
      transformResponse: (res: AddressMutationApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to create address");
      },
    }),

    // PATCH /addresses/:id
    updateAddress: builder.mutation<
      Address,
      { id: string; data: Partial<AddressInput> }
    >({
      query: ({ id, data }) => ({
        url: `/addresses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Address"],
      transformResponse: (res: AddressMutationApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to update address");
      },
    }),

    // DELETE /addresses/:id
    deleteAddress: builder.mutation<{ success: true }, string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});
export const {
  useGetAddressesQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
