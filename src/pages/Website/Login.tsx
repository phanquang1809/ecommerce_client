import { useState, useEffect, FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../../store/userStore";
import GradientBackground from "../../UI/GradientBackground";
import {
  sendVerificationCode,
  changePassword,
  verifyEmail,
  createUser,
  loginWithSocialAccount,
} from "../../services/authServices";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import LoginForm from "./Auth/LoginForm";
import VerificationForm from "./Auth/VerificationForm";
import ChangePasswordForm from "./Auth/ChangePasswordForm";
import CreateAccount from "./Auth/CreateAccount";
import { SendEmailResetPassword } from "./Auth/SendEmailResetPassword";
import { SendOtpRegister } from "./Auth/SendOtpRegister";
export default function Login() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useUserStore();
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("login");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOtp, setIsOpenOtp] = useState(false);

  const [error, setError] = useState<{
    userInput?: string;
    password?: string;
    confirmPassword?: string;
  }>({
    userInput: "",
    password: "",
    confirmPassword: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [address, setAddress] = useState({
    province: { label: "", value: "" },
    district: { label: "", value: "" },
    ward: { label: "", value: "" },
    addressDetail: "",
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    const path =
      location.pathname.split("/")[location.pathname.split("/").length - 1];

    if (path.startsWith("create") && emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
      setStep("createAccount");
    } else if (path.startsWith("change-password") && tokenParam) {
      setToken(tokenParam);
      setStep("changePassword");
    } else if (path.startsWith("verify") && emailParam) {
      setEmail(emailParam);
      setStep("verification");
    } else {
      setStep("login");
    }
  }, [location]);

  const handleSendVerificationCode = async () => {
    toast.promise(sendVerificationCode(email, false), {
      loading: <span className="text-xs">Đang gửi email đến {email}...</span>,
      success: (
        <span className="text-xs">Vui lòng kiểm tra email của bạn 📩</span>
      ),
      error: <span className="text-xs">Có lỗi xảy ra! ❌</span>,
    });
  };

  const handleVerifyEmail = async () => {
    if (!code.trim()) {
      toast.error("Vui lòng nhập mã xác nhận!");
      return;
    }
    setIsLoading(true);
    const result = await verifyEmail(email, code, false);
    setIsLoading(false);
    if (result.status === "success") {
      toast.success(result.message);
      setToken(result.token);
      setStep("createAccount");
      navigate(
        "/customer/account/create?token=" + result.token + "&email=" + email
      );
    } else {
      toast.error(result.message);
    }
  };
  const handleLogin = async () => {
    const newErrors = { ...error };
    if (!userInput.trim()) {
      newErrors.userInput =
        "Vui lòng nhập email, số điện thoại hoặc tên đăng nhập!";
    }
    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    }
    setError(newErrors);
    if (!newErrors.userInput && !newErrors.password) {
      setIsLoading(true);
      const { status, message } = await login(userInput, password, rememberMe);
      setIsLoading(false);
      if (status === "success") {
        navigate("/");
      } else {
        setMessage(message);
      }
    }
  };

  const handleChangePassword = async () => {
    const newErrors = { ...error };
    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    setError(newErrors);
    if (!newErrors.password && !newErrors.confirmPassword) {
      setIsLoading(true);
      toast.promise(
        changePassword(token, password, confirmPassword).then((result) => {
          setIsLoading(false);
          if (result.status === "success" && result.message) {
            setPassword("");
            setConfirmPassword("");
            navigate("/customer/account/login");
            return result.message;
          }
          throw new Error(result.message || "Đổi mật khẩu thất bại!");
        }),
        {
          loading: "Đang cập nhật mật khẩu...",
          success: (message) => message,
          error: (err) => err.message,
        }
      );
    }
  };
  const { setUser, setInitialized } = useUserStore();
  const handleCreacteAccount = async () => {
    const newErrors = { ...error };

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Vui lòng nhập số điện thoại");
    } else if (!/^0\d{9}$/.test(phoneNumber)) {
      setPhoneError("Số điện thoại không hợp lệ");
    } else {
      setPhoneError("");
    }

    const isAddressValid =
      address.province.value &&
      address.district.value &&
      address.ward.value &&
      address.addressDetail;

    if (!isAddressValid) {
      toast.error("Vui lòng chọn đầy đủ địa chỉ");
      return;
    }

    setError(newErrors);

    if (
      !newErrors.password &&
      !newErrors.confirmPassword &&
      !phoneError &&
      isAddressValid
    ) {
      setIsLoading(true);

      // Gọi API createUser (bạn nên sửa `createUser` để nhận thêm phone + address nếu chưa có)
      const result = await createUser(
        email,
        password,
        confirmPassword,
        token,
        phoneNumber,
        address // Truyền thêm nếu backend chấp nhận
      );

      setIsLoading(false);
      if (result.status === "success") {
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        navigate("/");
        setUser(result.user);
        setInitialized(true);
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    switch (step) {
      case "login":
        handleLogin();
        break;
      case "verification":
        handleVerifyEmail();
        break;
      case "changePassword":
        handleChangePassword();
        break;
      case "createAccount":
        handleCreacteAccount();
        break;
      default:
        console.warn("Dữ liệu không hợp lệ:", step);
    }
  };
  const handleSocialLogin = async (provider: string) => {
    const url=await loginWithSocialAccount(provider);
    window.location.href=url.url
  }
  if (isAuthenticated && user?.role === "user") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <GradientBackground />
      <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
        <div className="max-w-[450px] w-[calc(100vw-32px)] mx-auto rounded-lg p-6 flex flex-col bg-white">
          <img
            src="/image/Walmart-Logo-New.png"
            alt="logo"
            className="w-40 mx-auto"
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "login" && (
              <LoginForm
                userInput={userInput}
                setUserInput={setUserInput}
                password={password}
                setPassword={setPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                error={error}
                setError={setError}
                setIsOpen={setIsOpen}
                isLoading={isLoading}
              />
            )}
            {step === "verification" && (
              <VerificationForm
                email={email}
                setCode={setCode}
                handleSendVerificationCode={handleSendVerificationCode}
                isLoading={isLoading}
              />
            )}
            {step === "changePassword" && (
              <ChangePasswordForm
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                error={error}
                setError={setError}
                isLoading={isLoading}
              />
            )}
            {step === "createAccount" && (
              <CreateAccount
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                error={error}
                setError={setError}
                isLoading={isLoading}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                phoneError={phoneError}
                setPhoneError={setPhoneError}
                address={address}
                setAddress={setAddress}
              />
            )}

            {message && <p className="text-red-600 text-sm">{message}</p>}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00c5ff] to-[#3746fc] text-white font-medium py-3"
            >
              {isLoading ? (
                <svg
                  className="text-transparent animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  ></path>
                </svg>
              ) : (
                <>
                  {step === "login" && "Đăng nhập"}
                  {step === "verification" && "Xác thực"}
                  {step === "changePassword" && "Đổi mật khẩu"}
                  {step === "createAccount" && "Đăng ký tài khoản"}
                </>
              )}
            </Button>
            {step === "login" && (
              <>
                <div className="relative my-4">
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Hoặc
                    </span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="w-full py-3 flex items-center justify-center space-x-3"
                    onClick={() => handleSocialLogin("google")}
                  >
                    <svg
                      fill="none"
                      height="20"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_7700_1631)">
                        <path
                          d="M9.99976 8.18179V12.0545H15.3816C15.1452 13.3 14.4361 14.3546 13.3724 15.0636L16.6179 17.5818C18.5088 15.8365 19.5997 13.2728 19.5997 10.2273C19.5997 9.51827 19.5361 8.83639 19.4179 8.1819L9.99976 8.18179Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M4.39568 11.9034L3.66371 12.4637L1.07275 14.4818C2.7182 17.7454 6.09068 20 9.99974 20C12.6997 20 14.9633 19.1091 16.6179 17.5819L13.3724 15.0636C12.4815 15.6636 11.3451 16.0273 9.99974 16.0273C7.39976 16.0273 5.19073 14.2728 4.39976 11.9091L4.39568 11.9034Z"
                          fill="#34A853"
                        />
                        <path
                          d="M1.07265 5.51819C0.390868 6.86359 0 8.38179 0 9.99994C0 11.6181 0.390868 13.1363 1.07265 14.4817C1.07265 14.4907 4.39998 11.8999 4.39998 11.8999C4.19998 11.2999 4.08177 10.6636 4.08177 9.99984C4.08177 9.33612 4.19998 8.69979 4.39998 8.0998L1.07265 5.51819Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M9.99995 3.98182C11.4727 3.98182 12.7818 4.49089 13.8272 5.47272L16.6908 2.60912C14.9545 0.990971 12.7 0 9.99995 0C6.09089 0 2.7182 2.24545 1.07275 5.51819L4.39998 8.10001C5.19084 5.73635 7.39996 3.98182 9.99995 3.98182Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7700_1631">
                          <rect fill="white" height="20" width="20" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-md text-black font-semibold">
                      Google
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="w-full py-3 flex items-center justify-center space-x-3"
                    onClick={() => console.log("Google login clicked")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="black"
                      />
                    </svg>
                    <span className="text-md text-black font-semibold">
                      Apple
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    className="w-full py-3 flex items-center justify-center space-x-3"
                    onClick={() => console.log("Google login clicked")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                        fill="blue"
                      />
                    </svg>
                    <span className="text-md text-black font-semibold">
                      Meta
                    </span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Bạn chưa có tài khoản?{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => {
                      setIsOpenOtp(true);
                    }}
                    className="text-blue-600 text-sm p-0"
                    disabled={isLoading}
                  >
                    Đăng ký
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <SendEmailResetPassword open={isOpen} setOpen={setIsOpen} />
      <SendOtpRegister open={isOpenOtp} setOpen={setIsOpenOtp} />
    </div>
  );
}
