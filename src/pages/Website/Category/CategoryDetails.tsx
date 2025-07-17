import React, { useEffect, useRef, useState } from "react";
import SortDropdown from "./SortDropdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FilterSidebar from "./FilterSidebar";
import ProductList from "@/features/products/components/ProductList";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useInfiniteCategoryBySlug } from "@/services/categoryServices";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

const CategoryDetails = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [sortBy, setSortBy] = useState(searchParams.get("sort-by") || "newest");
  const [selectedFilters, setSelectedFilters] = useState<{ slug: string; values: string[] }[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteCategoryBySlug(slug || "", sortBy, selectedFilters);

  // 🔄 Hàm tái sử dụng để cập nhật URL
  const updateURLParams = (sort: string, filters: { slug: string; values: string[] }[]) => {
    const params = new URLSearchParams();
    params.set("sort-by", sort);
    filters.forEach((f) => {
      if (f.values.length > 0) {
        params.set(f.slug, f.values.join(","));
      }
    });
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  // 🧠 Lấy filter từ URL lần đầu
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filters: { slug: string; values: string[] }[] = [];

    params.forEach((values, key) => {
      if (key !== "sort-by") {
        filters.push({ slug: key, values: values.split(",") });
      }
    });

    setSelectedFilters(filters);
    const sortParam = params.get("sort-by");
    if (sortParam) setSortBy(sortParam);
  }, []);

  // 👀 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sortBy]);

  const products = data?.pages.flatMap((page) => page.data.products);
  const category = data?.pages[0]?.data.category;
  const filters = data?.pages[0]?.data.filters || [];
  const breadcrumbs = data?.pages[0]?.data.category_tree;

  const handleSelect = (groupSlug: string, valueSlug: string) => {
    setSelectedFilters((prev) => {
      const existing = prev.find((f) => f.slug === groupSlug);
      const updatedValues = existing
        ? existing.values.includes(valueSlug)
          ? existing.values.filter((v) => v !== valueSlug)
          : [...existing.values, valueSlug]
        : [valueSlug];

      const newState = [
        ...prev.filter((f) => f.slug !== groupSlug),
        ...(updatedValues.length > 0 ? [{ slug: groupSlug, values: updatedValues }] : []),
      ];

      updateURLParams(sortBy, newState);
      return newState;
    });
  };
  useEffect(() => {
    
  })
  if (error) {
    return (
      <div className="container max-w-7xl mx-auto pt-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Đã có lỗi xảy ra</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-6">
      {/* BREADCRUMB + HEADER */}
      {isLoading ? (
        <div className="flex flex-col gap-4 p-5 bg-white rounded-lg mb-5">
          <div className="flex items-center gap-2 text-gray-300">
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={i}>
                <Skeleton className={`h-4 w-[${60 + i * 20}px]`} />
                {i < 3 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              </React.Fragment>
            ))}
          </div>
          <Skeleton className="h-6 w-[200px]" />
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className={`h-8 w-[${70 + i * 10}px]`} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-5 bg-white rounded-lg mb-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Walmart</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs?.map((cat, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={cat.id}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{cat.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={`/${cat.slug}`}>{cat.name}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl font-bold my-4 text-blue-900">{category?.name}</h1>
          {category?.children && category?.children?.length > 0 && (
            <div className="flex items-center gap-2">
              {category.children.map((child) => (
                <Button
                  onClick={() => navigate(`/${child.slug}`)}
                  key={child.id}
                  variant="outline"
                  size="sm"
                >
                  {child.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SORT + FILTER + PRODUCT */}
      <div className="flex justify-end items-center mb-2">
        <div className="hidden lg:flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="h-8 w-[150px]" />
          ) : (
            <SortDropdown
              value={sortBy}
              onSortChange={(value) => {
                setSortBy(value);
                updateURLParams(value, selectedFilters);
              }}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-2">
        <div className="w-1/5">
          <FilterSidebar
            loading={isLoading}
            groups={filters.map((filter) => ({
              slug: filter.slug,
              title: filter.title,
              options: filter.options.map((v) => ({ slug: v.slug, name: v.name })),
              selectedValues: selectedFilters.find((f) => f.slug === filter.slug)?.values || [],
            }))}
            onSelect={handleSelect}
          />
        </div>
        <div className="flex-1">
          <ProductList
            loading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            products={products || []}
            title={null}
            limit={5}
          />
          {hasNextPage && <div ref={observerRef} className="mt-6"></div>}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
