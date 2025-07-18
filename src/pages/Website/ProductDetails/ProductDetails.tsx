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
import { getProductByShop } from "@/services/website/productServices";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProductDetails as ProductDetailsProps } from "./productdetails.type";
import ShopInfo from "@/features/products/components/product-details/ShopInfo";
import ProductDescriptions from "@/features/products/components/product-details/ProductDescriptions";
import RelatedProducts from "@/features/products/components/product-details/RelatedProducts";
import { Product } from "@/features/products/types/product.type";
import ProductConfig from "@/features/products/components/product-details/ProductConfig";
import AddToCart from "@/features/products/components/product-details/AddToCart";
import useUserStore from "@/store/userStore";

export default function ProductDetails() {
  const { shop, slug } = useParams();
  const {user}=useUserStore();
  const location = useLocation();
  const stateData = location.state?.data as {
    product: ProductDetailsProps;
    relatedProducts: Product[];
  } | null;
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (stateData?.product) {
      setProduct(stateData.product);
    }
    if (stateData?.relatedProducts) {
      setRelatedProducts(stateData.relatedProducts);
    }
  }, [stateData]);
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  // Chỉ gọi API nếu chưa có trong state
  const handleGetProductByShop = useCallback(async () => {
    if (!slug || !shop) return;
    try {
      const response = await getProductByShop(slug, shop);
      if (response?.status === "success") {
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts ?? []);
        setCurrentVariantIndex(0);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, [slug, shop]);

  useEffect(() => {
    if (product?.slug !== slug) {
      handleGetProductByShop();
    }
  }, [handleGetProductByShop, slug, product]);
  
  if (!product) return null;
  return (
    <div className="container mx-auto my-5 space-y-5 ">
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
                variantImage={product.variants[currentVariantIndex].image || ""}
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
            <h2 className="text-lg font-semibold mb-4">Khách hàng đánh giá</h2>
          </div>
        </div>
        <div className="flex-1 space-y-5 bg-white h-fit p-5 rounded-md sticky top-20">
          <ShopInfo shop={product.shop} />
          <AddToCart variant={product.variants[currentVariantIndex]} product={product} disabled={product.shop.id===user?.shop?.id}  />
        </div>
      </div>
    </div>
  );
}
