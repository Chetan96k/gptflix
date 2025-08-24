import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[60%] left-5 md:left-10 -translate-y-1/2 max-w-xs sm:max-w-md md:max-w-lg text-white z-20 px-2 sm:px-0">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-xl mb-3 md:mb-4">
        {title}
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-200 drop-shadow-lg">
        {overview.length > 200 ? overview.slice(0, 200) + "..." : overview}
      </p>
      <div className="mt-4 md:mt-6 flex flex-wrap gap-3">
        <button className="bg-white text-black font-bold px-4 py-2 sm:px-5 md:px-6 rounded hover:bg-gray-300 transition cursor-pointer text-sm md:text-base">
          Play
        </button>
        <button className="bg-black/60 border border-white text-white font-bold px-4 py-2 sm:px-5 md:px-6 rounded hover:bg-white hover:text-black transition cursor-pointer text-sm md:text-base">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
