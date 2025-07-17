import { motion } from "framer-motion";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import SellerInfo from "./SellerInfo";

interface Product {
  name: string;
  images: string[];
  price: number;
  description: string;
  options: { name: string; values: string[] }[];
}

interface PreviewProps {
  product: Product;
}

export default function Preview({ product }: PreviewProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="preview-container w-full mx-auto border rounded overflow-hidden">
      {/* Container cho Swiper */}
      <div className="w-full h-full flex items-center justify-center relative">
        {product.images && product.images.length > 0 ? (
          <div className="w-full h-[310px]">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-full overflow-hidden"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <motion.img
                    src={image}
                    alt={`${product.name || "Product"} image ${index + 1}`}
                    className="w-full h-full object-contain select-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {product.images.length > 1 && (
              <>
                <button
                  className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10 hover:bg-black/70 transition"
                  aria-label="Previous slide"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 z-10 hover:bg-black/70 transition"
                  aria-label="Next slide"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            {/* Nút điều hướng */}
          </div>
        ) : (
          <div className="w-[310px] h-[310px] flex items-center justify-center bg-accent">
            <span className="text-muted-foreground font-bold">WALMART</span>
          </div>
        )}
      </div>
      <div className="p-2">
        {product.images.length > 0 ? (
          <div className="text-right w-full text-primary dark:text-white text-xs pt-2 px-1 rounded-full">
            {activeIndex + 1}/{product.images.length}
          </div>
        ) : (
          <div className="flex justify-end gap-1 items-center pt-2 px-1 w-full">
            <div className="w-4 h-4 rounded bg-accent" />
            <div className="w-4 h-4 rounded  bg-accent" />
          </div>
        )}
        {/* Tên sản phẩm */}
        {product.name ? (
          <h3 className="text-md mt-2 w-full break-words leading-snug line-clamp-2">
            {product.name}
          </h3>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <div className="w-40 h-[15px] rounded bg-accent" />
            <div className="w-60 h-[15px] rounded bg-accent" />
          </div>
        )}
        {product.options ? (
          <div className="mt-2 space-y-3">
            {product.options.map((option) => (
              <div key={option.name} className="flex flex-col gap-1">
                <p className="text-sm">{option.name}</p>
                <div className="flex gap-1">
                  {option.values
                    .filter((value) => value !== "")
                    .map((value) => (
                      <div
                        key={value}
                        className="px-2 py-1 text-xs rounded bg-accent"
                      >
                        {value}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <SellerInfo />
      <div className="my-2">
        <p className="px-2 py-1 bg-accent">Mô tả</p>
        <div className="w-full px-2 mt-2 space-y-2">
          {product.description ? (
            <div
              className="text-sm leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <>
              <div className="w-full h-[15px] rounded bg-accent" />
              <div className="w-full h-[15px] rounded bg-accent" />
              <div className="w-30 h-[15px] rounded bg-accent" />
              <div className="w-full h-40 border rounded bg-accent flex items-center justify-center">
                <span className="text-muted-foreground font-bold">WALMART</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
