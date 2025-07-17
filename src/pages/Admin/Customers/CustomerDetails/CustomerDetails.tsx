import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerDetial } from "@/services/admin/adminServices";
import { Customer } from "@/types";
// import Info from "../../../components/customers/Info";
import Badge from "@/UI/Badge";
import { BadgeDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type CustomerDetail = Customer & { phone: string,created_at: string};

export default function CustomerDetails() {
  const { id } = useParams(); // Lấy ID từ URL
  const [customer, setCustomer] = useState<CustomerDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      handleCustomerDetails(Number(id));
    }
  }, [id]);
  const handleCustomerDetails = async (customerId: number) => {
    setLoading(true);
    try {
      const result = await getCustomerDetial(customerId);
      if (result.status === "success") {
        setCustomer(result.data);
      } else {
        console.log("Lỗi khi lấy dữ liệu:", result.message);
      }
    } catch (error) {
      console.error("Lỗi không xác định:", error);
    } finally {
      setLoading(false);
    }
  };
  const [activeTabValue, setActiveTabValue] = useState<string>("info");
  const tabs = [
    { id: "info", label: "Thông tin", value: "info" },
    { id: "secutiry", label: "Bảo mật", value: "secutiry" },
    { id: "address", label: "Địa chỉ", value: "address" },
  ];
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (!customer) return <div>Không tìm thấy khách hàng</div>;
  const handleRenderTabs=(activeTabValue:string)=>{
      switch (activeTabValue)
      {
        case "info":
            // return <Info/>;
            return <div>Thong tin khach hang</div>;
        case "secutiry":
            return <div>Thông tin bảo mật</div>;
        case "address":
            return <div>Địa chỉ</div>;
        default:
            return <div>Chưa xử lý tab này</div>;
      }
  }
  return (
    <div className="grid grid-cols-3 gap-6 my-5">
        <div className="col-span-full flex items-center justify-between">
            <div className="flex flex-col items-start gap-1 text-primary dark:text-white">
                <h4 className="text-xl">Mã khách hàng #{customer.id}</h4>
                <p>Ngày tạo: {customer.created_at}</p>
            </div>
            <button className="p-2 border border-red-500 rounded text-red-500 font-semibold hover:bg-red-500/10 transition-colors">Xóa khách hàng</button>
            </div>
      <div className="col-span-1 bg-accent h-fit shadow-2xl p-5 rounded-md  flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center gap-4 pt-7">
        <Avatar className="size-30 !rounded-md">
      <AvatarImage src={customer.avatar} alt={customer.full_name} />
      <AvatarFallback><UserRound className="size-30"/></AvatarFallback>
    </Avatar>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold text-primary dark:text-white">
              {customer.full_name}
            </h1>
            <h1 className="text-md font-light text-primary dark:text-white">
              Mã khách hàng: #{customer.id}
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-around gap-4 w-full">
          <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded bg-background flex items-center justify-center">
          <ShoppingBag className="size-6 text-primary" /> {/* Icon ví */}
        </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-primary/ dark:text-white">127</span>
              <span className="text-primary dark:text-white">Đơn hàng</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded bg-background flex items-center justify-center">
          <BadgeDollarSign className="size-6 text-primary" /> {/* Icon ví */}
        </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-primary dark:text-white">98.950.000đ</span>
              <span  className="text-primary dark:text-white">Chi tiêu</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-primary dark:text-white">Thông tin</h2>
          <hr className="text-primary dark:text-white" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-primary dark:text-white">
              <p>Tên tài khoản:</p>
              <p>{customer.user_name}</p>
            </div>
            <div className="flex items-center gap-1 text-primary dark:text-white">
              <p>Email:</p>
              <p>{customer.email}</p>
            </div>
            <div className="flex items-center gap-1 text-primary dark:text-white">
              <p>Trạng thái:</p>
              <Badge
                color={
                  customer.status === "inactive"
                    ? "purple"
                    : customer.status === "active"
                    ? "lime"
                    : "rose"
                }
              >
                {customer.status === "inactive"
                  ? "Chưa kích hoạt"
                  : customer.status === "active"
                  ? "Hoạt động"
                  : "Bị khóa"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-primary dark:text-white">
              <p>Liên hệ:</p>
              <p>{customer.phone}</p>
            </div>
          </div>
        </div>
        <button className="p-2 bg-background rounded text-primary">Cập nhật thông tin</button>
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-2">
        {tabs.map((tab) =>{
          return(
           <button key={tab.id} onClick={()=>setActiveTabValue(tab.id)} className={`rounded ${activeTabValue===tab.id?'!bg-accent':''} hover:bg-accent py-2 px-4 text-sm text-primary `}>{tab.label}</button>
          )
        })}
        </div>
        <div className="mt-5">
        {handleRenderTabs(activeTabValue)}
        </div>
      </div>
    </div>
  );
}
