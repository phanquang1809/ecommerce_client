import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductImages from "@/features/products/components/product-details/ProductImages";
import ProductInfo from "@/features/products/components/product-details/ProductInfo";
import React, {  useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProductDetails as ProductDetailsProps } from "./productdetails.type";
import ShopInfo from "@/features/products/components/product-details/ShopInfo";
import ProductDescriptions from "@/features/products/components/product-details/ProductDescriptions";
import RelatedProducts from "@/features/products/components/product-details/RelatedProducts";
import { Product } from "@/features/products/types/product.type";
import ProductConfig from "@/features/products/components/product-details/ProductConfig";
import AddToCart from "@/features/products/components/product-details/AddToCart";
import useUserStore from "@/store/userStore";
import { useProductByShop } from "@/services/website/productServices";

export default function ProductDetails() {
  const { shop, slug } = useParams();
  const { user } = useUserStore();
  const location = useLocation();
  const stateData = location.state?.data as {
    product: ProductDetailsProps;
    relatedProducts: Product[];
  } | null;

  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  // Ưu tiên stateData từ route, nếu không thì gọi API
  const {
    data: fetchedData,
    isLoading,
    isError,
  } = useProductByShop(slug || "", shop || "", !stateData);

  const product = stateData?.product || fetchedData?.data?.product || null;
  const relatedProducts =
    stateData?.relatedProducts || fetchedData?.data?.relatedProducts || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!product || isLoading) return null;
  if (isError) return <div>Không thể tải sản phẩm.</div>;

  return (
    <div className="container mx-auto my-5 space-y-5 ">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Walmart</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {product.category?.map((cat) => (
            <React.Fragment key={cat.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${cat.slug}`}>{cat.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-5">
        <div className="flex flex-col flex-1  gap-5">
          <div className="flex w-full gap-5">
            <div className="space-y-5 flex flex-col gap-5">
              <ProductImages
                images={product.images}
                title={product.name}
                variantImage={
                  product.variants[currentVariantIndex]?.image || ""
                }
              />
            </div>
            <div className="space-y-5 w-xl">
              <ProductInfo
                product={product}
                onChangeVariant={setCurrentVariantIndex}
              />
              <RelatedProducts relatedProducts={relatedProducts || []} />
              {product.configs && product.configs.length > 0 && (
                <ProductConfig configs={product.configs} />
              )}
              <ProductDescriptions descriptions={product.description} />
            </div>
          </div>
          <div className="w-full p-5 bg-white rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              Khách hàng đánh giá
            </h2>
          </div>
        </div>
        <div className="flex-1 space-y-5 bg-white h-fit p-5 rounded-md sticky top-20">
          <ShopInfo shop={product.shop} />
          <AddToCart
            variant={product.variants[currentVariantIndex]}
            product={product}
            disabled={product.shop.id === user?.shop?.id}
          />
        </div>
      </div>
    </div>
  );
}
