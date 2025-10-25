import { useState, useEffect } from "react";
import Logo from "./Logo";
import { cn } from "../utils/cn";

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleWindowScrollEvent = () => {
      const scrollY = window.scrollY;
      setIsScroll(scrollY > 3);
    };

    window.addEventListener("scroll", handleWindowScrollEvent);
    return () => window.removeEventListener("scroll", handleWindowScrollEvent);
  });

  return (
    <header
      className={cn(
        "fixed top-0 right-0 w-full bg-transparent transition-all duration-150",
        isScroll && "bg-background shadow-lg",
      )}
    >
      <div className="mx-auto max-w-[1440px] p-4">
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
