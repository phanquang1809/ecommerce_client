import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProductCard from "./ProductCard";
import { Product } from "../types/product.type";

type ProductListProps = {
  products: Product[];
  hasBorder?: boolean;
};

export default function ProductSlider({ products,hasBorder=false }: ProductListProps) {
  const [visibleSlides, setVisibleSlides] = useState(5);
  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleSlides(2);
      else if (width < 768) setVisibleSlides(3);
      else if (width < 1025) setVisibleSlides(4);
      else setVisibleSlides(6);
    };

    updateVisibleSlides(); // chạy ngay ban đầu
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  const shouldShowButtons = products.length > visibleSlides;

  const swiperRef = useRef<SwiperType | null>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        setIsPrevDisabled(swiperRef.current?.isBeginning ?? false);
        setIsNextDisabled(swiperRef.current?.isEnd ?? false);
      });
    }
  }, []);
  console.log(isPrevDisabled, isNextDisabled);

  return (
    <div className="product-slider relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoHeight={true}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1025: { slidesPerView: 5 },
          1400: { slidesPerView: 6 },
        }}
        spaceBetween={16}
        speed={500}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-full">
            <ProductCard product={product} hasBorder={hasBorder} />
          </SwiperSlide>
        ))}
      </Swiper>
      {shouldShowButtons && (
        <>
          <button
            className="inline-flex focus:outline-none hover:scale-120 transition duration-200 ease-in-out focus-visible:outline-0 disabled:opacity-0 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold font-lexend text-sm gap-x-1.5 p-1.5 shadow-sm text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 aria-disabled:bg-gray-900   focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500  items-center absolute transform top-1/2  -translate-y-1/2 left-0 -translate-x-1/2  z-1 rounded-full cursor-pointer"
            disabled={isPrevDisabled}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            className="focus:outline-none focus-visible:outline-0 hover:scale-120 transition duration-200 ease-in-out disabled:opacity-0 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold font-lexend text-sm gap-x-1.5 p-1.5 shadow-sm text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 aria-disabled:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center  absolute  transform top-1/2  -translate-y-1/2 right-0 translate-x-1/2 z-1  rounded-full cursor-pointer"
            disabled={isNextDisabled}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </>
      )}
    </div>
  );
}
