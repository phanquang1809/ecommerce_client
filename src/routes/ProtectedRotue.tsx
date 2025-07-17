import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "@/store/userStore";
// import NotFound from "@/pages/NotFound";

type UserRole = "admin" | "user" | "shop" | null;

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  redirectTo: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo,
}) => {
  const { isAuthenticated, user, initialized } = useUserStore();
  const location = useLocation();
  if (!initialized) {
    return null;
  }
  if (!isAuthenticated) {
    const currentPath = location.pathname;
  
    let loginPath = "/customer/account/login"; // default
  
    if (currentPath.startsWith("/admin")) {
      loginPath = "/admin/login";
    } else if (currentPath.startsWith("/seller")) {
      loginPath = "/seller/login";
    } else if (currentPath.startsWith("/customer")) {
      loginPath = "/customer/account/login";
    }
  
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }
  // Kiểm tra role
  if (!user?.role || !allowedRoles.includes(user.role)) {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "theme-dark-blue");
    return <Navigate to={redirectTo} replace />;
  }
  // if (!user?.role || !allowedRoles.includes(user.role)) {
  //   return <NotFound/>;
  // }

  // Đã đăng nhập và có quyền => Cho phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;
