import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";
import { CartApiResponse } from "../types";
import { Cart, Size } from "../../types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => "/cart",
      transformResponse: (response: CartApiResponse) => {
        if (response.success) {
          return response.data;
        }
        throw new Error(
          "Unreachable: CartApiResponse error reached transformResponse",
        );
      },
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<
      Cart,
      { productId: string; size: Size; quantity: number }
    >({
      query: ({ productId, size, quantity }) => ({
        url: "/cart/items",
        method: "POST",
        body: { productId, size, quantity },
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (res: CartApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Item Not Added");
      },
    }),
    updateCartItemQuantity: builder.mutation<
      Cart,
      { productId: string; size: Size; quantity: number }
    >({
      query: ({ productId, size, quantity }) => ({
        url: `/cart/items/${productId}/${size}`,
        method: "PATCH",
        body: { quantity },
      }),
      transformResponse: (res: CartApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Update Cart Item Failed");
      },
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation<Cart, { productId: string; size: Size }>({
      query: ({ productId, size }) => ({
        url: `cart/items/${productId}/${size}`,
        method: "DELETE",
      }),
      transformResponse: (res: CartApiResponse) => {
        if (res.success) return res.data;
        throw new Error("Delete cart item failed");
      },
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
        transformResponse: (res: CartApiResponse) => {
          if (res.success) return res.data;
          throw new Error("Failed to clear Cart");
        },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
  useAddToCartMutation,
  useClearCartMutation,
} = cartApi;
