import { useRef, useState, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  imageUrl: string;
  title?: string;
  description?: string;
  link?: string;
}

interface BannerSliderProps {
  slides: Slide[];
}

const BannerSlider = ({ slides }: BannerSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    swiperRef.current?.slideTo(index);
  }, []);

  const dotCount = useMemo(() => Math.ceil(slides.length / 2), [slides.length]);

  return (
    <div className="relative w-full container mx-auto group p-5 bg-white rounded-lg mt-5 pb-10">
      <Swiper
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={20}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full  rounded-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} >
            <div className="relative w-full h-full aspect-video rounded-lg overflow-hidden ">
              <img
                src={slide.imageUrl}
                alt={slide.title || "Slide"}
                className="w-full h-full object-cover"
              />
              {slide.title && (
                <div className="absolute inset-0 bg-black/40 flex items-center p-6">
                  <div className="text-white max-w-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      {slide.title}
                    </h2>
                    {slide.description && (
                      <p className="text-white/90 text-sm md:text-base mb-4">
                        {slide.description}
                      </p>
                    )}
                    {slide.link && (
                      <a
                        href={slide.link}
                        className="inline-block bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition"
                      >
                        Xem thêm
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev/Next Buttons */}
      {slides.length > 2 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-10 -translate-y-1/2 z-30 bg-white/80 hover:bg-white border-none rounded-full w-10 h-10 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-10 group-hover:translate-x-0"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="size-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-10 -translate-y-1/2 z-30 bg-white/80 hover:bg-white border-none rounded-full w-10 h-10 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-10 group-hover:translate-x-0"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="size-6" />
          </Button>
        </>
      )}

      {/* Indicator dots */}
      {slides.length > 2 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-30">
          <div className="bg-black/30 rounded-full p-1.5 flex gap-2">
            {Array.from({ length: dotCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * 2)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === Math.floor(currentSlide / 2)
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
