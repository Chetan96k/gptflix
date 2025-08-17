import React from "react";

const Header = () => {
  return (
    <div className="h-20 flex items-center justify-between bg-gradient-to-b from-black px-4 md:px-16 transition duration-1200">
      {/* <img
        className="w-28 md:w-48"
        src="/header_logo.png"
        alt="Netflix Logo"
      /> */}
      <p className="text-white font-bold text-4xl tracking-widest">
        GPTFLIX
      </p>
    </div>
  );
};

export default Header;
