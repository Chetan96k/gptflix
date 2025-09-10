import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { goToGptSearch, goToHome } from "../utils/pageSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const isOnGptSearchPage = useSelector((store) => store.page.isOnGptSearchPage);

  const handleTogglePage = () => {
    if (isOnGptSearchPage) {
      dispatch(goToHome());
      navigate("/browse");
    } else {
      dispatch(goToGptSearch());
      navigate("/gptsearch");
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  return (
    <div className="h-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-6 md:px-16">
      <p className="text-white font-bold text-2xl md:text-4xl tracking-widest">
        GPTFLIX
      </p>

      {user && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleTogglePage}
            className="text-sm font-semibold bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition duration-300 cursor-pointer"
          >
            {isOnGptSearchPage ? "Home" : "GPTSearch"}
          </button>

          <button
            onClick={handleSignOut}
            className="text-sm font-semibold bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition duration-300 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
