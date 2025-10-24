import React from "react";

const NavBar = () => {
  return (
    <header className="bg-background fixed top-0 right-0 w-full">
      <div className="mx-auto max-w-[1440px] p-4">
        <div
          className="font-dm text-primary text-2xl font-semibold"
          aria-label="Queue up logo"
        >
          QueueUp
        </div>
      </div>
    </header>
  );
};

export default NavBar;
