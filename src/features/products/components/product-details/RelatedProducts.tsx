import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Product } from "../../types/product.type";
import ProductCard from "../ProductCard";

interface RelatedProductsProps {
  relatedProducts?: Product[];
}

export default function RelatedProducts({ relatedProducts = [] }: RelatedProductsProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const slidesPerView = 3;
  const rows = 2;
  const slidesPerPage = slidesPerView * rows;
  const totalPages = Math.ceil(relatedProducts.length / slidesPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePaginationClick = (page: number) => {
    if (!swiperRef.current) return;
    const index = page * slidesPerPage;
    swiperRef.current.slideTo(index);
    setCurrentPage(page);
  };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       handlePaginationClick(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       handlePaginationClick(currentPage + 1);
//     }
//   };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="w-full p-5 bg-white rounded-md relative">
      <h2 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h2>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const newPage = Math.floor(swiper.activeIndex / slidesPerPage);
          setCurrentPage(newPage);
        }}
        slidesPerView={slidesPerView}
        grid={{
          rows,
          fill: "row",
        }}
        spaceBetween={10}
        modules={[Grid, Navigation]}
        className="w-full"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id} className="w-full mb-2">
              <ProductCard product={product} hasBorder hiddenOptions />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePaginationClick(index)}
            className={`h-[2px] w-4 transition-all duration-300 ${
              currentPage === index ? "bg-blue-600 w-8" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
