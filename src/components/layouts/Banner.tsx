import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

type Banner = {
  id: number;
  title: string;
  cover: string;
  thumbnail: string;
  cover_mobile: string;
  banner_url: string;
};
type BannersProps = {
  banners: Banner[];
  error: Error | null;
  isLoading: boolean;
};
export default function Banner({ banners, error, isLoading }: BannersProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        // Kiểm tra xem có phải là slide đầu tiên không
        setIsPrevDisabled(swiperRef.current?.isBeginning ?? false);
        // Kiểm tra xem có phải là slide cuối cùng không
        setIsNextDisabled(swiperRef.current?.isEnd ?? false);
      });
    }
  }, []);
  return (
    <div className="w-full section-banner relative mt-5">
      {error ? (
        <p className="text-center text-xl font-medium">Đã có lỗi xảy ra</p>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-50">Đang tải...</div>
      ) : (
        <div className="wrapper">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={10}
            speed={500}
            modules={[Pagination, Navigation]}
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <img
                  className="object-cover w-full rounded-3xl"
                  width={1920}
                  height={600}
                  alt={banner.title}
                  srcSet={`
      ${banner.cover_mobile} 600w, 
      ${banner.thumbnail} 1200w, 
      ${banner.cover} 1920w
    `}
                  sizes="(max-width: 600px) 600px, 
           (max-width: 1200px) 1200px, 
           1920px"
                  src={banner.cover}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="focus:outline-none focus-visible:outline-0 hover:scale-120 transition duration-200 ease-in-out disabled:opacity-0 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold font-lexend text-sm gap-x-1.5 p-1.5 shadow-sm text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 aria-disabled:bg-gray-900   focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center absolute transform top-1/2  -translate-y-1/2 left-0 -translate-x-1/2  z-1 rounded-full cursor-pointer"
            disabled={isPrevDisabled}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <HiChevronLeft className="size-5" />
          </button>
          <button
            className="focus:outline-none focus-visible:outline-0 hover:scale-120 transition duration-200 ease-in-out disabled:opacity-0 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-bold font-lexend text-sm gap-x-1.5 p-1.5 shadow-sm text-white  bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 aria-disabled:bg-gray-900   focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center  absolute transform top-1/2  -translate-y-1/2 right-0 translate-x-1/2 z-1  rounded-full cursor-pointer"
            disabled={isNextDisabled}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <HiChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
