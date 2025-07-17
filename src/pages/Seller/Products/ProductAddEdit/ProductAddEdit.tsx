import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleAlert, Eye, Loader, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  createProduct,
  getFormData,
  getFormDataDetails,
  updateProduct,
  updateProductStatus,
} from "@/services/seller/productServices";
import ImageUpload from "@/features/products/components/image-upload/ImageUpload";
import ProductOptions from "@/features/products/components/options/ProductOptions";
import Preview from "@/features/products/components/preview/Preview";
import CategorySelect from "@/features/products/components/CategorySelect";
import { useNavigate, useParams } from "react-router-dom";
import {
  Product,
  Variant,
} from "../../../../features/products/types/product.type";
import VariantsTable from "@/features/products/components/options/VariantsTable";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ProductEditor } from "@/features/products/components/ProductEditor";
import ProductConfig from "@/features/products/components/ProductConfig";
const MAX_OPTIONS = 2;
type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};
type Attributes = {
  id: number;
  name: string;
  slug: string;
};
export default function ProductAddEdit() {
  const { slug } = useParams();
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stock: "",
    shortDescription: "",
    category: "",
    images: "",
    options: "",
    variants: {},
    weight: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<Attributes[]>([]);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  // const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState<string>("");
  const [toggleVariantWeight, setToggleVariantWeight] = useState(false);
  const handleGetFormData = useCallback(async () => {
    const response = await getFormData();
    if (response.status === "success") {
      setCategories(response.data.categories);
      setAttributes(response.data.attributes);
    }
  }, []);
  const [options, setOptions] = useState<
    { id: number; name: string; slug: string; values: string[] }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [variants, setVariants] = useState<Variant[]>([]);
  const {
    data: productData,
    loading,
    error,
  } = useAuthFetch<{ status?: string; message?: string; data?: Product }>(
    slug ? "/shop/products/" + slug : null
  );
  const [isConfigLoading, setIsConfigLoading] = useState(false);
  useEffect(() => {
    if (!slug) {
      handleReset();
    } else if (productData?.status === "success" && productData.data) {
      const product = productData.data;
      setName(product.name || "");
      setDescription(product.description || "");
      setImages(product.images || []);
      setPrice(product.pricing?.price || 0);
      setStock(product.total_stock || 0);
      setVariants(product.variants.length > 1 ? product.variants : []);
      setOptions(product.options || []);
      setSelectedCategory(product.category || null);
      setStatus(product.status || "active");
      setWeight(product.variants?.[0]?.weight || 0);
      setToggleVariantWeight(
        product.variants?.some(
          (v) => v.weight > 0 && product.variants?.[0]?.weight !== v.weight
        ) || false
      );
    }
    handleGetFormData();
  }, [slug, productData, loading, handleGetFormData]);
  const handleReset = () => {
    setName("");
    setDescription("");
    setImages([]);
    setPrice(0);
    setStock(0);
    setVariants([]);
    setOptions([]);
    setSelectedCategory(null);
    setStatus("active");
    setWeight(0);
    setToggleVariantWeight(false);
    setConfigs([]);
  };

  const checkValid = () => {
    if (!name || name.length < 10 || name.trim().split(" ").length < 2)
      return false;
    if (images.length === 0) return false;
    if (!selectedCategory) return false;
    if (!description.trim()) return false;
    if (options.length > 0) {
      if (
        variants.length <= 1 ||
        Object.keys(errors.variants).length > 0 ||
        variants.some((v) => v.weight <= 0) ||
        variants.some((v) => v.price <= 0)
      )
        return false;
    } else {
      if (price <= 0) return false;
      if (stock <= 0) return false;
    }
    return Object.entries(errors)
      .filter(([key]) => key !== "variants") // bỏ qua key "variants"
      .every(([, value]) => value === "");
  };

  const isValid = checkValid();
  const handleAddOption = () => {
    if (options.length >= MAX_OPTIONS) return;
    setOptions((prev) => [
      ...prev,
      {
        name: "Phân loại " + (options.length + 1),
        slug: "",
        id: 0,
        values: [""],
      },
    ]);
  };
  const handleVariantChange = (
    variants: Variant[],
    errors: Record<number, { price?: string; stock?: string }>
  ) => {
    setVariants(variants);
    const formattedErrors = Object.keys(errors).length === 0 ? "" : errors;
    setErrors((prev) => ({
      ...prev,
      variants: formattedErrors,
    }));
  };

  const handleUpload = useCallback((newImages: string[]) => {
    setImages([...newImages].filter((item) => item !== ""));
  }, []);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, name: "Vui lòng nhập tên sản phẩm" }));
    } else if (value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        name: "Tên sản phẩm phải ít nhất 10 ký tự",
      }));
    } else if (value.length > 120) {
      setName(value.slice(0, 120));
    } else if (value.trim().split(" ").length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Tên sản phẩm phải có ít nhất 2 từ",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Chỉ cho phép số (và rỗng để xóa)
    if (/^\d*$/.test(rawValue)) {
      setPrice(Number(rawValue));

      if (!rawValue) {
        setErrors((prev) => ({ ...prev, price: "Vui lòng nhập giá" }));
      } else if (Number(rawValue) <= 0) {
        setErrors((prev) => ({ ...prev, price: "Giá phải lớn hơn 0" }));
      } else if (Number(rawValue) < 1000) {
        setErrors((prev) => ({ ...prev, price: "Giá phải lớn hơn 1000đ" }));
      } else {
        setErrors((prev) => ({ ...prev, price: "" }));
      }
    }
  };


  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (/^\d*$/.test(rawValue)) {
      setStock(Number(rawValue));
    }
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (/^\d*$/.test(rawValue)) {
      setWeight(Number(rawValue));
      variants.forEach((variant) => {
        variant.weight = Number(rawValue);
      });
      if (Number(rawValue) === 0) {
        setErrors((prev) => ({ ...prev, weight: "Cân nặng phải lớn hơn 0" }));
      } else {
        setErrors((prev) => ({ ...prev, weight: "" }));
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    images.forEach((img) => {
      formData.append("images[]", img);
    });
    if (variants.length > 0) {
      formData.append("variants", JSON.stringify(variants));
    }
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("weight", weight.toString());
    // formData.append("short_description", shortDescription);
    formData.append("description", description);
    if(brand)
    {
      formData.append("brandId", brand.toString());
    }
   if (attributeValues.length > 0) {
  attributeValues.forEach((id) => {
    formData.append("attribute_values[]", id.toString());
  });
}
    if (selectedCategory) {
      formData.append("category", selectedCategory?.id.toString());
    }
    if (slug) {
      formData.append("_method", "PUT");
    }
    try {
      setIsLoading(true);
      const response = slug
        ? await updateProduct(formData, slug)
        : await createProduct(formData);
      if (response.status === "success") {
        toast.success(slug ? "Cập nhật thành công!" : "Thêm mới thành công!");
        navigate("/seller/products");
      }
    } catch (error) {
      console.error("Gửi sản phẩm thất bại:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateStatus = async () => {
    if (slug) {
      const response = await updateProductStatus(
        slug,
        status === "inactive" ? "active" : "inactive"
      );
      if (response.status === "success") {
        setStatus(status === "inactive" ? "active" : "inactive");
        toast.success("Cập nhật trạng thái thành công!");
      }
    }
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const handleCancel = () => {
    setOpenDialogCancel(false);
    handleReset();
    navigate("/seller/products");
  };
  const handleOptionsChange = (
    updatedOptions: {
      id: number;
      name: string;
      slug: string;
      values: string[];
    }[]
  ) => {
    setOptions(updatedOptions);
    if (updatedOptions.length === 0) {
      setVariants([]);
      setToggleVariantWeight(false);
    }
    if (weight > 0) {
      setVariants((prev) => prev.map((v) => ({ ...v, weight: weight })));
    }
  };
  const handleToggleVariantWeight = (checked: boolean) => {
    setToggleVariantWeight(checked);
    if (!checked) {
      setVariants(
        (prev) => prev.map((v) => ({ ...v, weight: weight })) // Đặt cân nặng về 0 nếu tắt toggle
      );
    }
  };
  const [configs, setConfigs] = useState<{id?:number,name:string,type:'attribute'|'brand',can_add_new?:boolean,values:{id:number,value:string,from_shop:boolean}[]}[]>([]);
  const [attributeValues, setAttributeValues] = useState<number[]>([]);
  const [brand, setBrand] = useState<number|null>(null);
  console.log(attributeValues,brand);
  
  const handleConfigValueChange=(brandId:number | null,attrValueIds:number[])=>{
    setBrand(brandId);
    setAttributeValues(attrValueIds);
  }
  const handldeGetFormDataDetails=async(cat_id:number)=>{
    setIsConfigLoading(true);
    const response = await getFormDataDetails(cat_id);
    if(response.status === "success"){
      setConfigs(response.data);
      setIsConfigLoading(false);
    }
  }
  useEffect(() => {
    if(selectedCategory){
      handldeGetFormDataDetails(selectedCategory.id);
    } 
  },[selectedCategory])
  if (error) return <div>Lỗi: {error}</div>;
  return (
    <div className="flex gap-3 w-full relative mt-5">
      <section className="flex-1 space-y-3 relative">
        {status === "inactive" && (
          <div className="!text-black flex items-center gap-2 text-md px-2 py-4 rounded-md border border-yellow-300 bg-yellow-100">
            <CircleAlert className="size-5 text-yellow-400" />
            Sản phẩm đã bị ẩn
          </div>
        )}
        <Card className="shadow-none rounded-md py-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Thông tin cơ bản
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section sr-only="hình ảnh">
              <div className="flex items-start gap-1">
                {" "}
                <span className="text-rose-400">*</span>
                <h4 className="text-sm font-semibold mb-2">
                  Hình ảnh sản phẩm (khuyến nghị tỷ lệ 1:1)
                </h4>
              </div>
              {loading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-[550px]" />
                  <Skeleton className="h-3 w-[450px]" />
                  <Skeleton className="h-3 w-[550px]" />
                  <Skeleton className="h-3 w-[650px]" />
                </div>
              ) : (
                <ImageUpload
                  images={images}
                  onImageUpload={handleUpload}
                />
              )}
            </section>
            <section sr-only="thong tin san pham">
              <div className="flex items-start gap-1">
                {" "}
                <span className="text-rose-400">*</span>
                <h4 className="text-sm font-semibold mb-2">Tên sản phẩm</h4>
              </div>
              {loading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-[550px]" />
                  <Skeleton className="h-3 w-[850px]" />
                </div>
              ) : (
                <>
                  <div className="relative group">
                    <Input
                      value={name}
                      onChange={(e) => handleNameChange(e)}
                      placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                      className={cn(
                        "mt-2",
                        errors.name && "!border-rose-400 !ring-rose-400"
                      )}
                    />
                    {name && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-5 hidden group-hover:flex rounded-full"
                          onClick={() => {
                            setName("");
                          }}
                        >
                          <X className="size-3" />
                          <span className="sr-only">Clear</span>
                        </Button>
                        <Separator orientation="vertical" className="!h-4" />
                        <p className="!text-xs text-muted-foreground">
                          {name.length}/120
                        </p>
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-xs text-rose-400">{errors.name}</p>
                  )}
                </>
              )}
            </section>
            <div>
              <div className="flex items-start gap-1">
                <span className="text-rose-400">*</span>
                <h4 className="text-sm font-semibold mb-2">Ngành hàng</h4>
              </div>
              {loading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-[550px]" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ) : (
                <CategorySelect
                  initCategories={categories}
                  category={selectedCategory}
                  open={open}
                  onOpenChange={setOpen}
                  onConfirm={(selectedCategory) => {
                    setSelectedCategory(selectedCategory);
                  }}
                />
              )}
            </div>
            <div>
              <div className="flex items-start gap-1">
                <span className="text-rose-400">*</span>
                <h4 className="text-sm font-semibold mb-2">Mô tả sản phẩm</h4>
              </div>
              {loading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-[950px]" />
                  <Skeleton className="h-3 w-[650px]" />
                  <Skeleton className="h-3 w-[850px]" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ) : (
                <ProductEditor value={description} onChange={setDescription} />
              )}
            </div>
          </CardContent>
        </Card>
       
        <Card className="shadow-none rounded-md py-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Thông tin chi tiết
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             {isConfigLoading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-[550px]" />
                  <Skeleton className="h-3 w-[450px]" />
                  <Skeleton className="h-3 w-[550px]" />
                  <Skeleton className="h-3 w-[650px]" />
                </div>
              ) : (
              configs.length > 0 ? (
                <ProductConfig configs={configs} onChange={handleConfigValueChange} initConfigs={productData?.data?.configs}/>):"Có thể điều chỉnh sau khi chọn ngành hàng"
              )}
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md py-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Thông tin bán hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-[950px]" />
                <Skeleton className="h-3 w-[650px]" />
                <Skeleton className="h-3 w-[850px]" />
                <Skeleton className="h-3 w-full" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-1 mb-2">
                    <div className="flex gap-1 items-center">
                      <span className="relative flex h-2 w-2 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                      <h4 className="text-sm font-semibold">Phân loại hàng</h4>
                    </div>
                  </div>
                  {options.length === MAX_OPTIONS ? (
                    ""
                  ) : (
                    <Button
                      variant="outline"
                      className="!border-dashed !bg-transparent"
                      onClick={handleAddOption}
                    >
                      <Plus className="size-4" />
                      <p>Thêm nhóm phân loại</p>
                    </Button>
                  )}
                </div>
                {options.length > 0 ? (
                  <div className="space-y-6">
                    <ProductOptions
                      attributes={attributes}
                      options={options}
                      onChange={handleOptionsChange}
                    />
                    <VariantsTable
                      initVariants={variants}
                      toggleVariantWeight={toggleVariantWeight}
                      onVariantsChange={handleVariantChange}
                      options={options}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-start gap-1">
                        {" "}
                        <span className="text-rose-400">*</span>
                        <h4 className="text-sm font-semibold mb-2">Giá bán</h4>
                      </div>
                      <Input
                        value={price}
                        onChange={(e) => handlePriceChange(e)}
                        className={cn(
                          "mb-2 w-60",
                          errors.price && "!border-rose-400 !ring-0"
                        )}
                      />
                      {errors.price && (
                        <p className="text-rose-400 text-xs">{errors.price}</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-start gap-1">
                        {" "}
                        <span className="text-rose-400">*</span>
                        <h4 className="text-sm font-semibold mb-2">Kho hàng</h4>
                      </div>
                      <Input
                        value={stock}
                        onChange={(e) => handleStockChange(e)}
                        className="mb-2 w-60"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-md py-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Trọng lượng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-[950px]" />
                <Skeleton className="h-3 w-[650px]" />
                <Skeleton className="h-3 w-[850px]" />
                <Skeleton className="h-3 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {options.some((o) => o.values.some((v) => v !== "")) && (
                  <>
                    <h2 className="text-md font-semibold">
                      Thiết lập cân nặng cho từng phân loại
                    </h2>
                    <Switch
                      checked={toggleVariantWeight}
                      onCheckedChange={handleToggleVariantWeight}
                    />
                  </>
                )}
                {!toggleVariantWeight && (
                  <div>
                    <div className="flex items-start gap-1">
                      {" "}
                      <span className="text-rose-400">*</span>
                      <h4 className="text-sm font-semibold mb-2">
                        Cân nặng - gram (Sau khi đóng gói)
                      </h4>
                    </div>
                    <Input
                      placeholder="gram"
                      className={cn(
                        "w-60",
                        errors.weight && "!border-rose-400 !ring-0"
                      )}
                      value={weight}
                      onChange={(e) => handleWeightChange(e)}
                    />
                    {errors.weight && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.weight}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <div className="sticky bottom-0 bg-background py-2 z-50 flex justify-end gap-2 ">
          {slug ? (
            <>
              <Button variant="outline" disabled={isLoading}>
                Xóa
              </Button>
              <Button
                variant={status === "inactive" ? "default" : "outline"}
                onClick={handleUpdateStatus}
                disabled={isLoading}
                className={cn(
                  status === "inactive" ? "bg-blue-600 hover:bg-blue-500" : "",
                  "dark:text-white"
                )}
              >
                {status === "inactive" ? "Hiển thị" : "Ẩn"}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setOpenDialogCancel(true)}>
              Hủy
            </Button>
          )}
          <Button
            variant="default"
            disabled={!isValid || isLoading}
            className="bg-blue-600 hover:bg-blue-500 !text-white"
            onClick={handleSubmit}
          >
            {isLoading && <Loader className="animate-spin" />}
            {slug ? "Cập nhật" : "Lưu & Hiển thị"}
          </Button>
        </div>
      </section>
      <section className="w-90 self-start sticky top-19">
        <Card className="shadow-none rounded-md py-4">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-lg font-bold">Xem trước</CardTitle>
              <Button variant="outline" size="icon" disabled={!isValid}>
                <Eye />
              </Button>
            </div>
          </CardHeader>
          <ScrollArea className="h-[450px]">
            <CardContent className="w-90">
              <h4 className="text-sm font-semibold mb-2">Chi tiết sản phẩm</h4>
              <Preview
                product={{ name, images, price, description, options }}
              />
            </CardContent>
          </ScrollArea>
        </Card>
      </section>
      <Dialog open={openDialogCancel} onOpenChange={setOpenDialogCancel}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn hủy không? Tất cả thay đổi sẽ không được lưu.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              className="bg-blue-600 hover:bg-blue-500 !text-white"
              onClick={handleCancel}
            >
              Đồng ý
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
