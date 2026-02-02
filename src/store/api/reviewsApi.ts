import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

import type { Review } from "../../types";
import type {
  GetProductReviewsResponse,
  GetMyReviewResponse,
  CreateReviewInput,
  UpdateReviewInput,
} from "../types";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: baseQueryWithAuth,

  tagTypes: ["Reviews"],

  endpoints: (builder) => ({
    // GET product reviews
    getProductReviews: builder.query<
      GetProductReviewsResponse["data"],
      { productId: string; page?: number; limit?: number }
    >({
      query: ({ productId, page = 1, limit = 10 }) => ({
        url: `/products/${productId}/reviews`,
        params: { page, limit },
      }),

      transformResponse: (res: GetProductReviewsResponse) => res.data,

      providesTags: ["Reviews"],
    }),

    // GET my review for product
    getMyReviewForProduct: builder.query<Review | null, { productId: string }>({
      query: ({ productId }) => `/products/${productId}/reviews/me`,

      transformResponse: (res: GetMyReviewResponse) => res.data ?? null,

      providesTags: ["Reviews"],
    }),

    // CREATE review
    createReview: builder.mutation<
      Review,
      { productId: string; body: CreateReviewInput }
    >({
      query: ({ productId, body }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body,
      }),

      transformResponse: (res: { success: true; data: Review }) => res.data,

      invalidatesTags: ["Reviews"],
    }),

    // UPDATE review
    updateReview: builder.mutation<
      Review,
      { reviewId: string; body: UpdateReviewInput }
    >({
      query: ({ reviewId, body }) => ({
        url: `/reviews/${reviewId}`,
        method: "PATCH",
        body,
      }),

      transformResponse: (res: { success: true; data: Review }) => res.data,

      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation<{ success: true }, { reviewId: string }>({
      query: ({ reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useGetMyReviewForProductQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
