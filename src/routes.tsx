import { createBrowserRouter, Navigate } from "react-router-dom";
import { WebsiteLayout } from "@/layouts/website/WebsiteLayout";
import AdminProfile from "@/pages/Admin/Profile/AdminProfile";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import Settings from "@/pages/Admin/Settings/Settings";
import About from "@/pages/Website/About";
import Contact from "@/pages/Website/Contact";
import Home from "@/pages/Website/Home";
import Login from "@/pages/Website/Login";
import AdminLogin from "@/pages/Admin/Login/AdminLogin";
import UserProfile from "@/pages/Website/UserProfile";
import UserWishlist from "@/pages/Website/UserWishlist";
import UserWallet from "@/pages/Website/UserWallet";
import UserLayout from "@/layouts/website/UserLayout";
import UserDashboard from "@/pages/Website/UserDashboard";
import UserOrderHistory from "@/pages/Website/UserOrderHistory";
import UserAddress from "@/pages/Website/UserAddress";
import UserVoucher from "@/pages/Website/UserVoucher";
import ProtectedRoute from "@/routes/ProtectedRotue";
import AdminLayout from "@/layouts/AdminLayout";
import SellerLogin from "./pages/Seller/Login/Login";
import SellerDashboard from "./pages/Seller/Dashboard/Dashboard";
import ProductList from "./pages/Seller/Products/ProductList/ProductList";
import ProductAddEdit from "./pages/Seller/Products/ProductAddEdit/ProductAddEdit";
import SellerEdit from "./pages/Seller/Profile/SellerEdit";
import CustomerList from "./pages/Admin/Customers/CustomerList/CustomerList";
import CustomerDetails from "./pages/Admin/Customers/CustomerDetails/CustomerDetails";
import CategoryGroups from "./pages/Admin/Categories/CategoryGroups/CategoryGroups";
import CategorySubGroups from "./pages/Admin/Categories/CategorySubGroups/CategorySubGroups";
import SubCategories from "./pages/Admin/Categories/SubCategories/SubCategories";
import SellerList from "./pages/Admin/Sellers/SellerList/SellerList";
import SellerProfile from "./pages/Admin/Sellers/SellerProfile/SellerProfile";
import Transporters from "./pages/Admin/Transporters/Transporters";
import ProductDetails from "./pages/Website/ProductDetails/ProductDetails";
import ShopDetails from "./pages/Website/Shop/ShopDetails";
import CategoryDetails from "./pages/Website/Category/CategoryDetails";
import Media from "./pages/Seller/Media/Media";
import ListPromotion from "./pages/Seller/Promotions/ListPromotion/ListPromotion";
import FlashSale from "./pages/Seller/Promotions/FlashSale/FlashSale";
import Discount from "./pages/Seller/Promotions/ListPromotion/Discount";
import Voucher from "./pages/Seller/Promotions/ListPromotion/Voucher";
import AttributeList from "@/pages/Admin/Attributes/Attributes";
import Cart from "./pages/Website/Cart/Cart";
import BrandList from "./pages/Admin/Brands/Brands";
import CheckoutPage from "./pages/Website/Cart/Checkout";
import PaymentMethodList from "./pages/Admin/PaymentMethods/PaymentMethods";
import { CheckoutPayment } from "./pages/Website/Cart/CheckoutPayment";

// export const categoryLoader = async ({ params }: LoaderFunctionArgs) => {
//     const { slug } = params;
//     if (!slug) throw new Response("Not Found", { status: 404 });
//     const category = await getCategoryBySlug(slug);
//     if (!category) throw new Response("Not Found", { status: 404 });
//     return { category };
// };

// Khai báo router theo chuẩn v6
const router = createBrowserRouter([
    // 👉 Đăng nhập Admin (không cần bảo vệ)
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
   
    // 👉 Khu vực Admin (Yêu cầu đăng nhập)
    {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} redirectTo="/" />, // Chỉ Admin mới truy cập được
        children: [
            {
                path: "",
                element: <AdminLayout />,
                children: [
                    { path: "", element: <Dashboard /> },
                    { path: "customers", element: <CustomerList /> },
                    { path: "customers/details/:id", element: <CustomerDetails /> },
                    { path: "categories/groups", element: <CategoryGroups /> },
                    { path: "categories/subgroups", element: <CategorySubGroups /> },
                    { path: "categories/subcategories", element: <SubCategories /> },
                    { path: "attributes", element: <AttributeList /> },
                    { path: "brands", element: <BrandList /> },

                    { path: "shops", element: <SellerList /> },
                    { path: "shops/:slug", element: <SellerProfile /> },
                    { path: "settings", element: <Settings /> },
                    // { path: "products/all", element: <AllProduct /> },
                    // { path: "products/add", element: <AddProduct /> },
                    { path: "profile", element: <AdminProfile /> },
                    { path: "transporters", element: <Transporters /> },
                    { path: "payment-methods", element: <PaymentMethodList /> },

                    { path: "media", element: <Media /> },
                ],
            },
        ],
    },
    // 👉 Website (không yêu cầu đăng nhập)
    {
        path: "/",
        element: <WebsiteLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "cart", element: <Cart /> },
            {
                path: ":slug",
                element: <CategoryDetails />,
                // loader: categoryLoader,
                // errorElement: <NotFound />,
            },
            {
                path: "products/:shop/:slug",
                element: <ProductDetails />,
            },
            {
                path: "shops/:slug",
                element: <ShopDetails />,
            },
            // 👉 Khu vực tài khoản user (Yêu cầu đăng nhập)
            {
                path: "customer",
                element:<ProtectedRoute allowedRoles={["user","shop"]} redirectTo="/customer/account/login" />, // Chỉ cần đăng nhập, không phân biệt admin/user
                children: [
                    {
                        path: "",
                        element: <UserLayout />,
                        children: [
                            { index: true, element: <Navigate to="info" replace /> },
                            { path: "info", element: <UserProfile /> },
                            { path: "wishlist", element: <UserWishlist /> },
                            { path: "walmart-wallet", element: <UserWallet /> },
                            { path: "dashboard", element: <UserDashboard /> },
                            { path: "order-history", element: <UserOrderHistory /> },
                            { path: "address", element: <UserAddress /> },
                            { path: "voucher", element: <UserVoucher /> },
                        ],
                    },
                ],
            },
            {
                path: "checkout",
                element: <CheckoutPage />,
            },
            {
                path: "checkout/payment-qr",
                element: <CheckoutPayment />,
            },
        ],
    },

    // 👉 Đăng nhập User (không cần bảo vệ)
    {
        path: "/customer/account/:section",
        element: <Login />,
    },
    {
        path: "/seller/:section",
        element: <SellerLogin />,
    },
    {
        path: "/seller/edit",
        element: <SellerEdit />,
    },
    {
        path: "/seller",
        element: <ProtectedRoute allowedRoles={["shop"]} redirectTo="/seller/login" />, // Chỉ Admin mới truy cập được
        children: [
            {
                path: "",
                element: <AdminLayout />,
                children: [
                    { path: "", element: <SellerDashboard /> },
                    { path: "products", element: <ProductList /> },
                    { path: "products/add", element: <ProductAddEdit /> },
                    { path: "products/edit/:slug", element: <ProductAddEdit /> },
                    { path: "media", element: <Media /> },
                    { path: "promotions", element: <ListPromotion /> },
                    { path: "promotions/flash-sale", element: <FlashSale /> },
                    { path: "promotions/discount/create", element: <Discount /> },
                    { path: "promotions/voucher/create", element: <Voucher /> },
                ],
            },
        ],
    },
]);


export default router;
