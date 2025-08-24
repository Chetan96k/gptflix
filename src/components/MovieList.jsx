import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieList({ title, movies }) {
  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="pb-10 px-4 relative">
      {/* Title */}
      <h2 className="px-6 pb-2 text-white text-2xl">{title}</h2>

      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-0 -translate-y-1/2 z-10 
                   h-80 w-14 rounded-r-2xl flex items-center justify-center
                   bg-gradient-to-r from-black to-transparent hover:opacity-80"
      >
        <ChevronLeft className="text-white w-8 h-8" />
      </button>

      {/* Movie Cards Row */}
      <div
        ref={scrollRef}
        className="flex py-4 border-black overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            poster={movie.poster_path}
            title={movie.title}
          />
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-0 -translate-y-1/2 z-10
                   h-80 w-14 rounded-l-2xl flex items-center justify-center
                   bg-gradient-to-l from-black to-transparent hover:opacity-80"
      >
        <ChevronRight className="text-white w-8 h-8" />
      </button>
    </div>
  );
}

