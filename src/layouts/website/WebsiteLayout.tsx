import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../../App.css";
// import { Header } from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { useTheme } from "@/components/theme-provider";
import NewHeader from "@/components/layouts/NewHeader";
import { Toaster } from "sonner";
// import { Header } from "@/components/layouts/Header";
NProgress.configure({ showSpinner: false });
export const WebsiteLayout = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const navigation = useNavigation();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
      console.log("loading");
    } else {
      NProgress.done();
      console.log("done");
    }
  }, [navigation.state]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* <Header /> */}
      <NewHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
        <Toaster position="bottom-right" />

    </div>
  );
};
