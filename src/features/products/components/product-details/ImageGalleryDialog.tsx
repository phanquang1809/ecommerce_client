import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImageGalleryDialog({
  open,
  onClose,
  images,
  title,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(activeIndex);
  const handlePrev = () => {
    mainSwiper?.slidePrev();
  };

  const handleNext = () => {
    mainSwiper?.slideNext();
  };

  useEffect(() => {
    if (!mainSwiper) return;

    const onSlideChange = () => {
      setActiveIndex(mainSwiper.realIndex);
    };

    mainSwiper.on("slideChange", onSlideChange);
    onSlideChange(); // cập nhật lần đầu

    return () => {
      mainSwiper.off("slideChange", onSlideChange);
    };
  }, [mainSwiper]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-none w-screen h-full p-0 rounded-none border-none [&>button]:hidden !gap-0">
        <div className="border-b flex items-center justify-center py-2 relative">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <Button
            onClick={onClose}
            size="icon"
            variant="outline"
            className="absolute top-3 right-3 z-50 border-none shadow-none !bg-white size-8"
          >
            <X />
          </Button>
        </div>

        {/* Swiper chính */}
        {open && (
          <div className="w-full max-w-screen flex flex-col overflow-hidden relative">
            <Swiper
              onSwiper={(swiper) => setMainSwiper(swiper)}
              className="w-full h-full m-20  object-contain mx-auto"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={src}
                    alt={`Hình ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Nút điều hướng trái/phải */}
            <Button
              onClick={handlePrev}
              className="absolute left-10 top-1/2 transform -translate-y-1/2 rounded-full size-8 z-10 disabled:!cursor-not-allowed disabled:pointer-events-auto"
              variant="default"
              disabled={mainSwiper?.isBeginning}
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={handleNext}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 rounded-full size-8 z-10 disabled:!cursor-not-allowed disabled:pointer-events-auto"
              variant="default"
              disabled={mainSwiper?.isEnd}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
