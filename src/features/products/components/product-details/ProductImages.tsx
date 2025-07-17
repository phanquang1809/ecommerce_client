import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Expand } from "lucide-react";
import ImageGalleryDialog from "./ImageGalleryDialog";

interface ProductImagesProps {
  images: string[];
  title: string;
  variantImage?: string;
}

export default function ProductImages({
  images,
  title,
  variantImage,
}: ProductImagesProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  const thumbsRef = useRef<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
useEffect(() => {
  // Mỗi khi đổi ảnh (khi chọn sản phẩm khác), quay về ảnh đầu tiên
  if (mainSwiper && thumbsSwiper) {
    mainSwiper.slideTo(0);
    thumbsSwiper.slideTo(0);
    setActiveIndex(0);
  }
}, [images, variantImage]);

  const handlePrev = () => {
    thumbsRef.current?.slidePrev();
  };

  const handleNext = () => {
    thumbsRef.current?.slideNext();
  };

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState({
    backgroundImage: "",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0% 0%",
    backgroundSize: "300%",
    backgroundColor: "white",
    opacity: 0,
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle((prev) => ({
      ...prev,
      backgroundPosition: `${x}% ${y}%`,
    }));
  };

  const handleMouseEnter = (img: string) => {
    setZoomStyle({
      backgroundImage: `url(${img})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      backgroundSize: "150%",
      backgroundColor: "white",
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle((prev) => ({ ...prev, opacity: 0 }));
  };
  useEffect(() => {
    if (thumbsRef.current) {
      thumbsRef.current.on("slideChange", () => {
        setIsPrevDisabled(thumbsRef.current?.isBeginning ?? false);
        setIsNextDisabled(thumbsRef.current?.isEnd ?? false);
      });
    }
  }, []);

  useEffect(() => {
    if (!mainSwiper) return;

    const onChange = () => {
      setActiveIndex(mainSwiper.realIndex);
    };

    mainSwiper.on("slideChange", onChange);
    setActiveIndex(mainSwiper.realIndex); // Khởi tạo

    return () => {
      mainSwiper.off("slideChange", onChange);
    };
  }, [mainSwiper]);

  useEffect(() => {
    if (variantImage) {
      mainSwiper?.slideTo(0);
      thumbsRef.current?.slideTo(0);
    }
  }, [variantImage, mainSwiper, thumbsRef]);

  const [imagesGalleryOpen, setImagesGalleryOpen] = useState(false);
  return (
    <div className="flex gap-4 bg-white p-5 rounded-md sticky top-20">
      {/* Thumbs on the left */}
      <div className="w-25 lg:h-[430px] h-[300px] flex flex-col gap-2 items-center">
        <Swiper
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
            thumbsRef.current = swiper;
          }}
          direction="vertical"
          slidesPerView={images.length >= 4 ? 4 : images.length}
          spaceBetween={10}
          watchSlidesProgress={true}
          modules={[Thumbs]}
        >
          {variantImage && (
            <SwiperSlide className="flex-shrink-0 w-full aspect-square">
              <img
                src={variantImage}
                alt="Variant image"
                className={`w-full  object-cover border rounded-md cursor-pointer transition-all duration-200 hover:opacity-50 ${
                  activeIndex === 0 ? "opacity-50 " : ""
                }`}
              />
            </SwiperSlide>
          )}
          {images.map((img, idx) => (
            <SwiperSlide
              key={idx}
              className=" flex-shrink-0 w-full aspect-square"
            >
              <img
                src={img}
                alt={`Thumb ${idx + 1}`}
                className={`w-full h-full object-cover border rounded-md cursor-pointer transition-all duration-200 hover:opacity-50 ${
                  idx === activeIndex + (variantImage ? -1 : 0)
                    ? "opacity-50 "
                    : ""
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {images.length > 4 && (
          <div className="flex mt-2 gap-1 w-full">
            <Button
            size="sm"

              variant="outline"
              className="!flex-1 lg:h-7 h-5  rounded"
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              <ChevronDown />
            </Button>
            <Button
            size="sm"
              variant="outline"
              className="!flex-1 lg:h-7 h-5  rounded"
              onClick={handlePrev}
              disabled={isPrevDisabled}
            >
              <ChevronUp />
            </Button>
          </div>
        )}
      </div>

      {/* Main image swiper */}
      <div className="lg:w-[430px] w-[300px] aspect-square relative group">
        <Swiper
          onSwiper={(swiper) => setMainSwiper(swiper)}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="rounded-md overflow-hidden w-full h-full"
        >
          {variantImage && (
            <SwiperSlide
              key={variantImage}
              onClick={() => setImagesGalleryOpen(true)}
            >
              <div
                className="relative w-full h-full cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => handleMouseEnter(variantImage)}
                onMouseLeave={handleMouseLeave}
                ref={zoomRef}
              >
                <img
                  src={variantImage}
                  className="w-full h-full object-contain"
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-200 "
                  style={{
                    backgroundImage: zoomStyle.backgroundImage,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundSize: zoomStyle.backgroundSize,
                    opacity: zoomStyle.opacity,
                    zIndex: 10,
                  }}
                />
              </div>
            </SwiperSlide>
          )}
          {images.map((img, idx) => (
            <SwiperSlide key={idx} onClick={() => setImagesGalleryOpen(true)}>
              <div
                className="relative w-full h-full cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => handleMouseEnter(img)}
                onMouseLeave={handleMouseLeave}
                ref={zoomRef}
              >
                <img
                  src={img}
                  alt={`Ảnh sản phẩm ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-200 "
                  style={{
                    backgroundImage: zoomStyle.backgroundImage,
                    backgroundColor: zoomStyle.backgroundColor,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundSize: zoomStyle.backgroundSize,
                    opacity: zoomStyle.opacity,
                    backgroundRepeat: zoomStyle.backgroundRepeat,
                    zIndex: 10,
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          variant="outline"
          className="absolute bottom-0 left-0 z-50 size-10 rounded-full group-hover:opacity-100 opacity-0 transition-all duration-200"
          onClick={() => setImagesGalleryOpen(true)}
        >
          <Expand />
        </Button>
      </div>
      <ImageGalleryDialog
        open={imagesGalleryOpen}
        onClose={() => setImagesGalleryOpen(false)}
        images={images}
        title={title}
      />
    </div>
  );
}
