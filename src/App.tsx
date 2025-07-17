import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Suspense, useEffect } from "react";
import "./App.css";
import router from "./routes";
import useUserStore from "./store/userStore";
const queryClient = new QueryClient();

function App() {
const { checkAuth, initialized } = useUserStore();
useEffect(() => {
  // Chỉ gọi checkAuth khi người dùng chưa được khởi tạo
  if (!initialized) {
    checkAuth(false); 
  }
}, [checkAuth, initialized]);
  return (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
  );
}

export default App;
