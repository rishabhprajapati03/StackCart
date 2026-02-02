import type {
  Address,
  Cart,
  Order,
  PaymentMethod,
  Product,
  ProductBase,
  Review,
  Size,
  Wishlist,
} from "../types";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiErrorPayload = {
  success: false;
  message: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
};

export type ProductApiResponse = {
  success: boolean;
  data: {
    products: Product[];
    pagination: Pagination;
  };
};

export type Category = {
  count: number;
  name: string;
};
export type CategoriesApiResponse = {
  success: boolean;
  data: Category[];
};

// Cart

export type CartApiResponse = ApiSuccess<Cart> | ApiErrorPayload;

// wishlist

export type WishlistApiResponse = ApiSuccess<Wishlist> | ApiErrorPayload;

// address

// Get all addresses
export type GetAddressesApiResponse = ApiSuccess<Address[]> | ApiErrorPayload;

// Get single address
export type GetAddressApiResponse = ApiSuccess<Address> | ApiErrorPayload;

// Create / Update / Delete responses
export type AddressMutationApiResponse = ApiSuccess<Address> | ApiErrorPayload;

// orders

export type CreateOrderInput = {
  addressId: string;
  paymentMethod: PaymentMethod;
};
// GET /orders
export type GetOrdersApiResponse =
  | ApiSuccess<{
      orders: Order[];
      pagination: Pagination;
    }>
  | ApiErrorPayload;

// GET /orders/:id
export type GetOrderApiResponse = ApiSuccess<Order> | ApiErrorPayload;

// POST /orders
export type CreateOrderApiResponse = ApiSuccess<Order> | ApiErrorPayload;

// reviews

export type ReviewsPagination = {
  currentPage: number;
  totalPages: number;
  totalReviews: number;
  limit: number;
};

export type GetProductReviewsResponse = {
  success: true;
  data: {
    reviews: Review[];
    pagination: ReviewsPagination;
    averageRating: number;
  };
};

export type GetMyReviewResponse = {
  success: true;
  data: Review;
};

export type CreateReviewInput = {
  rating: number;
  comment?: string;
};

export type UpdateReviewInput = {
  rating?: number;
  comment?: string;
};
