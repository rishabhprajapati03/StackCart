export type Size =
  | "FREE"
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "28"
  | "30"
  | "32"
  | "34"
  | "36"
  | "38";

type ProductSize = {
  size: Size;
  stock: number;
};

export type ProductBase = {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: ProductSize[];
  isActive: boolean;
};

export type Product = ProductBase & {
  description: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductCardProps = Pick<
  Product,
  "_id" | "name" | "price" | "images"
>;

export type Category = {
  id: string;
  name: string;
  slug: string;
};

// Cart Types

export type CartItem = {
  product: ProductBase;
  size: Size;
  quantity: number;
};
export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Wishlist

export type Wishlist = {
  _id: string;
  user: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Address

// Address entity

export type Address = {
  _id: string;
  user: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AddressInput = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

// orders

export type PaymentMethod = "COD" | "UPI" | "CARD";
export type OrderItem = {
  product: string;
  size: Size;
  name: string;
  price: number;
  quantity: number;
};

export type ShippingAddressSnapshot = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";
export type Order = {
  _id: string;
  user: string;

  items: OrderItem[];

  shippingAddress: ShippingAddressSnapshot;
  paymentMethod: PaymentMethod;

  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;

  status: OrderStatus;

  createdAt: string;
  updatedAt: string;
};

// reviews

export type Review = {
  _id: string;
  user: string; // user id (or populated later)
  product: string; // product id
  rating: number; // 1–5
  comment?: string;
  createdAt: string;
  updatedAt: string;
};
