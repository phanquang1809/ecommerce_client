export type Category = {
  id: number;
  slug: string;
  name: string;
  children?: Category[];
};

export type Pricing = {
  price: number;
 min_price: number;
  max_price: number;
}

export type Attribute = {
  id: number;
  slug?: string;
  value: string;
  color_code?: string;
};

export type Option = {
  id: number;
  name: string;
  slug: string;
  values: string[];
};
export type Variant = {
  id?: number;
  attributes:Attribute[];
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  image?: string | null;
  weight: number;
};
export type Product = {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  configs?: { name: string; value: string }[];
  type?: string;
  status?: string;
  pricing?: Pricing;
  shop_slug?:string;
  category?: Category ;
  images: string[]; // vì bạn chỉ trả về mảng url
  total_stock?: number;
  total_sold?: number;
  variants: Variant[];
  options?: Option[];
};

export type ProductCard = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  price: number;
  discountedPrice: number;
  discount: number;
  promo: string;
  image: string;
  specs: string[];
  category: Category;
};

