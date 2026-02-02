import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";
import { Wishlist } from "../../types";
import { WishlistApiResponse } from "../types";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query<Wishlist, void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
      transformResponse: (res: WishlistApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to Get Wislist");
      },
    }),
    addToWishlist: builder.mutation<Wishlist, { productId: string }>({
      query: ({ productId }) => ({
        url: "/wishlist/items",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<Wishlist, { productId: string }>({
      query: ({ productId }) => ({
        url: `/wishlist/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
