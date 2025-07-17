import { Category, Option, Pricing, Variant } from "@/features/products/types/product.type"

export type ProductDetails ={
    id: number,
    name: string,
    description: string,
    brand: string,
    slug: string,
    pricing: Pricing,
    images: string[],
    category: Category[],
    configs?: { name: string; value: string }[],
    variants: Variant[],
    options:Option[],
    shop: Shop,
}
export type Shop={
    id: number,
    name: string,
    logo: string,
    slug: string
}