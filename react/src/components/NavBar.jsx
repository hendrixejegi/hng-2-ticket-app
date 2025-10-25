import React from "react";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <header className="bg-background fixed top-0 right-0 w-full">
      <div className="mx-auto max-w-[1440px] p-4">
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
