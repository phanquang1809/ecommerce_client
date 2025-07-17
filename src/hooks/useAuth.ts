import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";

const useAuth = () => {
    const { 
        isAuthenticated, 
        user, 
        checkAuth  // Sử dụng checkAuth thay vì checkAuth
    } = useUserStore();
    
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                // Gọi checkAuth để xác thực người dùng
                await checkAuth(true); // Sẽ gọi API để xác thực bằng cookie hoặc lưu trữ
            } catch (error) {
                console.error("Authentication check failed:", error);
            } finally {
                setIsInitializing(false);  // Đánh dấu việc xác thực đã hoàn tất
            }
        };

        initAuth();
    }, [checkAuth]); // Chú ý rằng checkAuth đã được thêm vào dependency array

    return { 
        isAuthenticated,  // Trả về trạng thái xác thực
        user,             // Trả về thông tin người dùng
        isInitializing    // Trả về trạng thái khởi tạo
    };
};

export default useAuth;
