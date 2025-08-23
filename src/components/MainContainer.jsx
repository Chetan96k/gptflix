import React from "react";
import { useSelector } from "react-redux";

import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import Header from "./Header";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  const mainMovie = movies[0];
  const { id, original_title, overview } = mainMovie;

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <VideoBackground id={id} />
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10" />

      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
