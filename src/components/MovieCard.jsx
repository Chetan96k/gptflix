import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ poster, title }) => {
  return (
    <div className="min-w-[140px] sm:min-w-[160px] md:min-w-[200px] max-w-[200px] rounded-2xl mx-2 sm:mx-3 hover:scale-105 transition-transform duration-200 relative overflow-hidden group">
      {/* Movie Poster */}
      <img
        src={IMG_CDN + poster}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-72 object-cover rounded-2xl shadow-lg"
      />

      {/* Gradient Overlay (Bottom 50%) */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 
                  bg-gradient-to-t from-black via-black/70 to-transparent 
                  rounded-b-2xl flex items-end p-1 sm:p-2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p className="text-white text-center text-xs sm:text-sm w-full">{title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
