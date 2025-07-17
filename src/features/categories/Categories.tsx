import { Link, useNavigate } from "react-router-dom";
// import CategorySkeleton from "./CategorySkeleton";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Grid, Scrollbar } from "swiper/modules";
import { Category } from "@/types";
import { motion } from "framer-motion";
import NProgress from "nprogress";
import { getCategoryBySlug } from "@/services/categoryServices";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryDetailsProps } from "@/pages/Website/Category/categorydetails.type";

type CategoriesProps = {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
};
interface CategoryDetailsResponse {
  data: CategoryDetailsProps;
  status: string;
  meta: {
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
}
export default function Categories({
  categories,
  isLoading,
  error,
}: CategoriesProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLinkClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();
    NProgress.start();

    const sortBy = "newest";
    try {
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["category", slug, sortBy],
        queryFn: ({ pageParam = 1 }) =>
          getCategoryBySlug(slug, sortBy,[], pageParam),
        getNextPageParam: (lastPage: CategoryDetailsResponse) => {
          const current = lastPage.meta.current_page;
          const last = lastPage.meta.last_page;
          return current < last ? current + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
      });
      navigate(`/${slug}`);
    } catch (error) {
      console.error("Không thể load dữ liệu danh mục:", error);
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="w-full bg-white p-5 rounded-lg mt-5">
      <h2 className="text-3xl font-bold text-blue-900">
        NGÀNH HÀNG
      </h2>
      {error ? (
        <p className="text-center text-xl font-medium">Đã có lỗi xảy ra</p>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-96">Đang tải...</div>
      ) : categories.length === 0 ? (
        <p className="text-center text-xl font-medium">Không có dữ liệu</p>
      ) : (
        <div className="mt-4 px-5">
          <div className="grid grid-cols-7 grid-rows-2 gap-10">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/${category.slug}`}
                onClick={(e) => handleLinkClick(e, category.slug)}
                className="p-2 rounded-4 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 scale-80 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-110" />
                  <motion.div
                    className="relative z-2"
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    whileTap={{ scale: 1, rotate: 0, borderRadius: "20%" }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <img
                      className="w-full object-cover rounded-xl"
                      src={category.image}
                      alt={category.name}
                    />
                  </motion.div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm text-center font-bold tracking-tight text-black group-hover:underline">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
