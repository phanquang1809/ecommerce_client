import { Link } from "react-router-dom";
import {
  HiOutlineBuildingStorefront,
  HiOutlineGlobeAlt,
  HiOutlineLifebuoy,
} from "react-icons/hi2";
import Search from "./Search";
import UserSection from "./UserSection";
import { useEffect, useState } from "react";
import { NavigationMenu } from "./NavigationMenu";

export default function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="w-full bg-blue-600 ">
      <div
        className={`transition-all h-10  duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="container border-b border-blue-500 mx-auto  flex text-xs font-semibold text-white items-center justify-between h-full">
          <Link
            to="/seller/signup"
            className="flex items-center gap-1 cursor-pointer"
          >
            <HiOutlineBuildingStorefront className="size-4" />
            <span>Kênh người bán</span>
            <span aria-hidden="true" className="h-3 w-px bg-gray-200" />
            <span>Trở thành người bán tại Walmart</span>
          </Link>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 cursor-pointer">
              <HiOutlineLifebuoy className="size-4" />
              <span>Hỗ trợ</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <HiOutlineGlobeAlt className="size-4" />
              <span>Tiếng Việt</span>
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="Top"
        className={`transition-shadow duration-200 ${
          isScrolled
            ? "fixed top-0 left-0 w-full bg-blue-600  z-50 shadow-lg"
            : ""
        }`}
      >
        <div className="mx-auto container py-3  flex items-center gap-6 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 ">
            <p className="font-bold text-white text-2xl">Walmart</p>
            <img src="/image/spark-icon.svg" className="size-10" />
          </Link>
          {/* Navigation & Search */}
          <div className="flex flex-1 items-center gap-4">
            <NavigationMenu isScrolled={isScrolled} />
            <Search isScrolled={isScrolled} />
          </div>
          {/* User Section */}
          <div className="min-w-max">
            <UserSection />
          </div>
        </div>
      </nav>
    </header>
  );
}
