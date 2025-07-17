import { useEffect, useState } from "react";
import { BsFillMoonStarsFill,BsSunFill  } from "react-icons/bs";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-1 transition-all 
                 text-gray-800 dark:text-gray-200 "
    >
      {darkMode ? <BsSunFill className="size-6 fill-yellow-400 " /> : <BsFillMoonStarsFill className="size-6 fill-blue-900"/>}
    </button>
  );
};

export default ThemeToggle;
