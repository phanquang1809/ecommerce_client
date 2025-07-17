export interface Promotion {
  id: number | string;
  code: string;
  name: string;
  type?:"voucher"|"product_discount"
  description?: string;
  discount_type: "percent" | "amount"; // or string if more types
  scope: "shop" | "specific";
  discount_value: number;
  max_discount?: number;
  min_order_value?: number;
  usage_limit?: number;
  usage_limit_per_user?: number;
  start_date?: string | Date;
  end_date?: string | Date;
  is_active: boolean;
  products?: number[]; // optional if scope === "specific"
}