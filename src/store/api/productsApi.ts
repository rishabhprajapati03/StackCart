import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoriesApiResponse,
  Category,
  Pagination,
  ProductApiResponse,
} from "../types";
import { Product } from "../../types";

type ProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  size?: string;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://stackcartbackend-production.up.railway.app/api",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      { products: Product[]; pagination: Pagination },
      ProductsParams
    >({
      query: (params) => ({
        url: "/products",
        params,
      }),
      transformResponse: (res: ProductApiResponse) => res.data,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (res: { success: boolean; data: Product }) => res.data,
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (res: CategoriesApiResponse) => res.data,
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} = productsApi;
