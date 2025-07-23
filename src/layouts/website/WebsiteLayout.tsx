import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../../App.css";
// import { Header } from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { useTheme } from "@/components/theme-provider";
import NewHeader from "@/components/layouts/NewHeader";
import {Toaster } from "sonner";

import { Chat } from "@/features/chat/Chat";
import useUserStore from "@/store/userStore";
import echo from "@/lib/echo";
import { Message } from "@/services/website/chatServices";
// import { Header } from "@/components/layouts/Header";
NProgress.configure({ showSpinner: false });
export const WebsiteLayout = () => {
  const { setTheme } = useTheme();
  const { user } = useUserStore();

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
  useEffect(() => {
    if (!user) return;

    const channel = echo.private(`user.${user.id}`);

    channel.listen(".MessageSent", ({message}: {message: Message} ) => {
      console.log("📨 Tin nhắn mới:", message);
    });
    channel.subscribed(() => {
      console.log("📡 Đã kết nối đến kênh private-user." + user.id);
    });
    return () => {
      echo.leave(`user.${user.id}`);
    };
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* <Header /> */}
      <NewHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
        <Chat />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};
