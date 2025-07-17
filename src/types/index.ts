export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  href: string;
  imageSrc: string;
  imageHoverSrc?: string;
  imageAlt: string;
  price: string;
  rating: number;
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  children?: Category[];
  featured?: Product[];
  totalProduct?: number;
  totalEarning?: number;
  status: string;
  description?: string;
};
export type CategoryGroup = {
  id: number;
  name: string;
  slug: string;
  image: string;
  totalProduct?: number;
  totalEarning?: number;
  status: string;
  description?: string;
};
export type CategorySubGroup = {
  id: number;
  name: string;
  slug: string;
  totalProduct?: number;
  totalEarning?: number;
  status: string;
  description?: string;
  parent: { id: number; name: string };
};
export type User = {
  id: number;
  email: string;
  user_name: string;
  full_name: string;
  avatar: string;
  phone: string;
  role: "admin" | "user" | "shop" | null;
  shop?: Shop;
  default_address: {
    id: number;
    address: string;
    province: string;
    district: string;
    ward: string;
    customer_name: string;
    customer_phone_number: string;
  };
};
export type AuthResponse = {
  user: User;
  access_token: string;
  token_type: string;
  expires_in: number;
  status: string;
  message: string;
};
export type Customer = {
  id: number;
  user_name?: string;
  full_name?: string;
  avatar: string;
  email: string;
  status: string;
  totalOrder: number;
};
export type Shop = {
  id: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  description?: string;
  logo?: string;
  banner?: string;
  user: User;
  status: "pending" | "active" | "banned";
  rating: number;
  is_active: boolean;
  created_at: string;
  total_reviews: number;
};
export type CategoryRevenue = {
  name: string;
  revenue: number;
};
export type BuyerProps = {
  id: number;
  full_name: string;
  avatar: string;
  total_order: number;
  total_spent: number;
};

export type Invoice = {
  store: {
    name: string;
    address: string;
    phone: string;
    email?: string; // Optional
  };
  id: string;
  date: string; // Format: "DD tháng MM năm YYYY"
  customer: {
    name: string;
    phone: string;
    address?: string; // Optional
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
};

export type Meta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export interface CartItem {
  productId: number;
  product_slug: string;
  sku: string;
  shop_slug: string;
  productName: string;
  variantId: number;
  variantOptions: string;
  product_url: string;
  product_stock: number;
  shopId: number;
  image: string;
  unitPriceAtTime: number;
  unitPrice: number;
  quantity: number;
  weight: number;
}
