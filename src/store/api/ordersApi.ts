import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

import type { Order } from "../../types";
import type { CreateOrderInput } from "../types";
import type {
  GetOrdersApiResponse,
  GetOrderApiResponse,
  CreateOrderApiResponse,
} from "../types";
import type { Pagination } from "../types";
import { cartApi } from "./cartApi";

type OrdersList = {
  orders: Order[];
  pagination: Pagination;
};

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Orders", "Cart"],
  endpoints: (builder) => ({
    // GET /orders
    getOrders: builder.query<
      OrdersList,
      { page?: number; limit?: number } | undefined
    >({
      query: (params) => ({
        url: "/orders",
        params,
      }),
      providesTags: ["Orders"],
      transformResponse: (res: GetOrdersApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to fetch orders");
      },
    }),

    // GET /orders/:id
    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: ["Orders"],
      transformResponse: (res: GetOrderApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to fetch order");
      },
    }),

    // POST /orders
    createOrder: builder.mutation<Order, CreateOrderInput>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(cartApi.util.invalidateTags(["Cart"]));
        } catch {
          // ignore
        }
      },

      invalidatesTags: ["Orders"],
      transformResponse: (res: CreateOrderApiResponse) => {
        if (res.success) {
          return res.data;
        }
        throw new Error("Failed to create order");
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = ordersApi;
