import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); // get user from redux

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        navigate("/");
      })
      .catch((error) => {
        // Error page or fallback
        navigate("/error");
      });
  };

  return (
    <div className="h-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-6 md:px-16">
      {/* <img
        className="w-28 md:w-48"
        src="/header_logo.png"
        alt="Logo"
      /> */}
      <p className="text-white font-bold text-2xl md:text-4xl tracking-widest">
        GPTFLIX
      </p>

      {user && ( // only show when signed in
        <button
          onClick={handleSignOut}
          className="text-sm font-semibold bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition duration-300 cursor-pointer"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
