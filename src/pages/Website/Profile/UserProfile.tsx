import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Lock, Pencil, Trash2, UserRound } from "lucide-react";
import useUserStore from "@/store/userStore";
import { UpdateFieldDialog } from "./UpdateFieldDialog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  loginWithSocialAccount,
  updateAvatar,
  updateEmail,
  updatePassword,
  updatePhone,
  updateProfile,
} from "@/services/authServices";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import AvatarUploadDialog from "./AvatarUploadDialog";
const maskPhone = (phone: string) => {
  if (phone.length < 4) return "*******";
  return "*".repeat(phone.length - 2) + phone.slice(-2);
};
const socialProviders = [
  {
    name: "google",
    icon: "/image/google_icon.png",
  },
  {
    name: "facebook",
    icon: "/image/facebook_icon.png",
  }
] as const;

const maskEmail = (email: string) => {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  const visibleChars = Math.min(2, name.length);
  return (
    name.slice(0, visibleChars) +
    "*".repeat(name.length - visibleChars) +
    "@" +
    domain
  );
};
export default function UserProfile() {
  const { user, setUser } = useUserStore();
  const [profile, setProfile] = useState({
    full_name: user?.full_name || "",
    user_name: user?.user_name || "",
    gender: user?.gender || undefined,
    date_of_birth: user?.date_of_birth
      ? new Date(user.date_of_birth)
      : undefined,
  });
  console.log(new Date(user?.date_of_birth || ""));

  const updateField = <K extends keyof typeof profile>(
    key: K,
    value: (typeof profile)[K]
  ) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };
  const [open, setOpen] = useState(false);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("user_name", profile.user_name);
    if (profile.gender) formData.append("gender", profile.gender);
    if (profile.date_of_birth)
      formData.append(
        "date_of_birth",
        format(profile.date_of_birth, "yyyy-MM-dd")
      );

    try {
      const res = await updateProfile(formData);
      toast[res.status === "success" ? "success" : "error"](res.message);
      if (res.status === "success") {
        setUser({
          ...user,
          ...profile,
          has_changed_user_name:user?.user_name !== profile.user_name
        });
      }
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const linkedProviders =
    user?.social_accounts?.map((acc) => acc.provider) || [];
  const handleUploadAvatar = async (image: string) => {
    try {
      setUploadingAvatar(true);
      const res = await updateAvatar(image);
      if (res.status === "success") {
        toast.success("Cập nhật ảnh thành công");
        setUser({ ...user, avatar: image });
        setOpenAvatarDialog(false);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Tải ảnh thất bại");
    } finally {
      setUploadingAvatar(false);
    }
  };
  const handleSocialLogin = async (provider: string) => {
      const url=await loginWithSocialAccount(provider);
      window.location.href=url.url
    }
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Thông tin tài khoản</h2>
      <div className="bg-white rounded-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thông tin cá nhân */}
        <div className="md:col-span-2 space-y-4 border-r pr-6">
          <h3 className="text-lg font-medium">Thông tin cá nhân</h3>

          {/* Ảnh và tên */}
          <div className="flex items-start gap-4">
            <div className="border rounded-full p-1 bg-blue-200 border-blue-200 relative">
              <div className="border rounded-full p-3 bg-blue-50 border-blue-50 relative">
                <Avatar className="h-20 w-20 bg-white">
                  <AvatarImage src={user?.avatar} alt={user?.full_name} />
                  <AvatarFallback className="bg-blue-900 text-white">
                    <UserRound className="h-15 w-15" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-gray-500 hover:bg-gray-400 size-6"
                  onClick={() => setOpenAvatarDialog(true)}
                >
                  <Pencil className="size-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
               <div>
                <Label className="mb-2">
                  Tên đăng nhập {!user?.has_changed_user_name && "(chỉ có thể thay đổi một lần)"}
                </Label>
                <Input
                  className="rounded"
                  disabled={user?.has_changed_user_name}
                  placeholder="Thêm nickname"
                  value={profile.user_name}
                  onChange={(e) => updateField("user_name", e.target.value)}
                />
              </div>
              <div>
                <Label className="mb-2">Họ & Tên</Label>
                <Input
                  className="rounded"
                  value={profile.full_name}
                  onChange={(e) => updateField("full_name", e.target.value)}
                />
              </div>
             
              <div>
                <Label className="mb-2">Ngày sinh</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal rounded"
                    >
                      {profile.date_of_birth
                        ? format(profile.date_of_birth, "dd/MM/yyyy", {
                            locale: vi,
                          })
                        : "Chọn ngày sinh"}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={profile.date_of_birth}
                      captionLayout="dropdown"
                      className="rounded"
                      onSelect={(date) => {
                        updateField("date_of_birth", date ?? undefined); // tránh null
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="mb-2">Giới tính</Label>
                <RadioGroup
                  className="flex gap-6 mt-2"
                  value={profile.gender}
                  onValueChange={(val) =>
                    updateField("gender", val as "male" | "female" | "other")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="r1" className="data-[state=checked]:border-blue-600  [&_svg]:fill-blue-600 [&_svg]:stroke-blue-600" />
                    <Label htmlFor="r1">Nam</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="r2" className="data-[state=checked]:border-blue-600  [&_svg]:fill-blue-600 [&_svg]:stroke-blue-600" />
                    <Label htmlFor="r2">Nữ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="r3" className="data-[state=checked]:border-blue-600  [&_svg]:fill-blue-600 [&_svg]:stroke-blue-600"/>
                    <Label htmlFor="r3">Khác</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <Button
            className="mt-4 rounded bg-blue-600 hover:bg-blue-500"
            onClick={handleUpdateProfile}
          >
            Lưu thay đổi
          </Button>
        </div>

        {/* Bên phải: Email, bảo mật */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Số điện thoại và Email</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Số điện thoại</span>
                <UpdateFieldDialog
                  title="Cập nhật số điện thoại"
                  field="phone"
                  defaultValue={user?.phone}
                  trigger={
                    <Button variant="outline" size="sm" className="rounded">
                      {user?.phone ? "Thay đổi" : "Cập nhật"}
                    </Button>
                  }
                  onSuccess={async (newValue: string) => {
                    const res = await updatePhone(newValue);
                    toast[res.status === "success" ? "success" : "error"](
                      res.message
                    );
                    if (res.status === "success") {
                      setUser({
                        ...user,
                        phone: newValue, // chỉ cập nhật field này
                      });
                    }
                    return res;
                  }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {user?.phone ? maskPhone(user?.phone) : "Chưa cập nhật"}
              </div>

              <div className="flex items-center justify-between mt-3">
                <span>Địa chỉ email</span>
                <UpdateFieldDialog
                  title="Cập nhật email"
                  defaultValue={user?.email}
                  field="email"
                  trigger={
                    <Button variant="outline" size="sm" className="rounded">
                      Thay đổi
                    </Button>
                  }
                  onSuccess={async (newValue: string) => {
                    const res = await updateEmail(newValue);
                    toast[res.status === "success" ? "success" : "error"](
                      res.message
                    );
                    if (res.status === "success") {
                      setUser({
                        ...user,
                        email: newValue, // chỉ cập nhật field này
                      });
                    }
                    return res;
                  }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {maskEmail(user?.email || "phanquang180918@gmail.com")}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Bảo mật</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Thiết lập mật khẩu
                </div>
                <UpdateFieldDialog
                  title="Cập nhật mật khẩu"
                  field="password"
                  trigger={
                    <Button variant="outline" size="sm" className="rounded">
                      Cập nhật
                    </Button>
                  }
                  onSuccess={async (newValue: string) => {
                    const res = await updatePassword(newValue);
                    toast[res.status === "success" ? "success" : "error"](
                      res.message
                    );
                    return res;
                  }}
                />
              </div>
              <div className="flex justify-between  items-center">
                <div className="flex items-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Yêu cầu xóa tài khoản
                </div>
                <Button variant="destructive" size="sm" className="rounded">
                  Yêu cầu
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Liên kết mạng xã hội</h3>
            <div className="space-y-4">
              {socialProviders.map((provider) => {
                const isLinked = linkedProviders.includes(provider.name);
                return (
                  <div
                    key={provider.name}
                    className="flex justify-between items-center"
                  >
                   <div className="flex items-center gap-2">
                     <img src={provider.icon} className="size-10 border rounded-md p-1" alt={provider.name} />
                    <span className="capitalize font-semibold">{provider.name}</span>
                   </div>
                    {isLinked ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded"
                        disabled
                      >
                        Đã liên kết
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="rounded" onClick={() => handleSocialLogin(provider.name)}>
                        Liên kết
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <AvatarUploadDialog
        open={openAvatarDialog}
        onOpenChange={setOpenAvatarDialog}
        onSubmit={handleUploadAvatar}
        loading={uploadingAvatar}
      />
    </div>
  );
}
