import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError() as { status?: number; statusText?: string };
    return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">404 - Không tìm thấy trang</h1>
      <p className="mt-2 text-lg">
        {error?.statusText || "Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa."}
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Quay về trang chủ
      </Link>
    </div>
  );
}
