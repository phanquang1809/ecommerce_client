import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useHome } from "@/services/homeService";
import { Category } from "@/types";
import FeaturedProduct from "./FeaturedProduct";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import NProgress from "nprogress";
import { getCategoryBySlug } from "@/services/categoryServices";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryDetailsProps } from "@/pages/Website/Category/categorydetails.type";

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
export function NavigationMenu({ isScrolled }: { isScrolled: boolean }) {
  const queryClient = useQueryClient();
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useHome();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCat, setCurrentCat] = useState<Category | null>(null);
  const { ref, isOutside } = useClickOutside<HTMLDivElement>(false);
  useEffect(() => {
    // Nếu nhấp ra ngoài thì đóng dropdown
    if (isOutside) {
      setOpen(false);
    }
  }, [isOutside]);
  useEffect(() => {
    if (!isLoading && data?.categories && !error) {
      setCategories(data.categories);
    }
  }, [isLoading, data, error]);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCat(categories[0]);
    }
  }, [categories]);
const handleLinkClick = async (
  e: React.MouseEvent<HTMLAnchorElement>,
  slug: string
) => {
  e.preventDefault();
  NProgress.start();

  const sortBy = "newest";
  try {
    // Prefetch query dữ liệu
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["category", slug, sortBy],
      queryFn: ({ pageParam = 1 }) => getCategoryBySlug(slug, sortBy,[], pageParam),
      getNextPageParam: (lastPage:CategoryDetailsResponse) => {
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
    setOpen(false);
    NProgress.done();
  }
};
  return (
    <div ref={ref}>
      {/* Trigger */}
      <div
        className={cn("flex items-center gap-2 cursor-pointer py-2 font-semibold  transition w-fit px-2 bg-blue-900 hover:bg-blue-800 rounded-md",open && "bg-blue-800")}
        onClick={() => setOpen(!open)}
      >
        <div className="w-6 h-6 flex items-center justify-center bg-amber-300 rounded-full">
        <Menu className="size-4 text-amber-900" />
        </div>
        <span className="text-white">Danh mục sản phẩm</span>
      </div>
      {/* Dropdown menu */}

      <>
        <div
          className={cn(
            "fixed left-0 w-full h-[calc(100vh-56px)] bg-black/30 z-20 transition-opacity duration-300",
            isScrolled ? "top-[63px]" : "top-[103px]",
            open ? "opacity-100 visible" : "opacity-0 invisible"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-full z-50 w-full bg-white shadow-lg border-t border-gray-200 rounded-b-md overflow-hidden transform transition-all duration-300 ease-out",
            open
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none"
          )}
        >
          <div className="mx-auto  px-4">
            {categories.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-gray-500">
                Đang tải...
              </div>
            ) : (
              <div className="grid grid-cols-9 h-[480px] gap-x-4 py-4">
                {/* Category list */}
                <ScrollArea className="col-span-2 flex flex-col gap-1 overflow-y-auto  border-r border-gray-200 pr-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition ${
                        currentCat?.id === category.id ? "bg-gray-100" : ""
                      }`}
                      onMouseEnter={() => setCurrentCat(category)}
                    >
                      <Link
                        to={`/${category.slug}`}
                        onClick={(e) => handleLinkClick(e, category.slug)}
                        className="flex items-center gap-2 w-full"
                      >
                        <img
                          src={category.image}
                          alt=""
                          className="w-8 h-8 object-cover"
                        />
                        <span className="font-medium text-black  text-sm">
                          {category.name}
                        </span>
                      </Link>
                      {currentCat?.id === category.id && (
                        <ChevronRight className="size-5 " />
                      )}
                    </div>
                  ))}
                </ScrollArea>

                {/* Subcategories and featured */}
                {currentCat && (
                  <>
                    {/* Subcategories */}
                    <div className="col-span-5 border-r border-gray-200 pr-4 overflow-y-auto no-scrollbar">
                      <div className="flex items-center gap-2 text-black mt-2">
                        <div className="font-bold text-md">
                          {currentCat.name}
                        </div>
                        <ArrowRight className="size-4" />
                      </div>
                      <div
                        aria-labelledby={`${currentCat.name}-heading`}
                        className="mt-3 grid grid-cols-1 xl:grid-cols-2 gap-4"
                      >
                        {currentCat.children?.map((item) => (
                          <div key={item.name}>
                            <Link
                              to={item.slug}
                              onClick={(e) => handleLinkClick(e, item.slug)}
                              className="text-md font-bold text-blue-600 hover:underline"
                            >
                              {item.name}
                            </Link>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {item.children?.map((child) => (
                                <Link
                                  key={child.name}
                                  to={child.slug}
                                  onClick={(e) =>
                                    handleLinkClick(e, child.slug)
                                  }
                                  className="text-sm text-gray-800 hover:underline"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Featured products */}
                    <div className="col-span-2 text-black max-h-[500px] overflow-y-auto no-scrollbar pl-2">
                      <div className="text-md font-bold mb-2">
                        Sản phẩm nổi bật
                      </div>
                      {currentCat.featured?.map((item) => (
                        <FeaturedProduct key={item.id} product={item} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
