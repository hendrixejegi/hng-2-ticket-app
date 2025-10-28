import { useState, useEffect } from "react";
import Logo from "./Logo";
import { cn } from "../utils";
import UserInfo from "./UserInfo";

const NavBar = ({ session, logout }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

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
        "font-dm text-text fixed top-0 right-0 w-full bg-transparent transition-all duration-150",
        isScroll && "bg-background shadow-lg",
      )}
    >
      <div className="mx-auto max-w-[1440px] p-4">
        <div className="flex items-center">
          <div>
            <Logo />
          </div>
          {session && (
            <div className="relative ml-auto">
              <button
                className="cursor-pointer"
                onClick={() => setShowOptions((prev) => !prev)}
              >
                <UserInfo session={session} />
              </button>
              {showOptions && (
                <div className="bg-surface absolute left-0 isolate z-50 mt-4 flex w-full flex-col items-center rounded-lg p-4 shadow-xl">
                  <button
                    className="hover:text-text cursor-pointer text-gray-500"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
