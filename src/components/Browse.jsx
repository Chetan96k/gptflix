import React from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="bg-gray-500">
      <div className="relative">
        {/* Header Component */}
        <Header />

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="absolute text-sm font-semibold top-6 right-8 bg-white text-black px-2 py-1 rounded hover:bg-gray-200 md:right-26 transition duration-300 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Browse;
