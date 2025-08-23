import { useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(id);

  return (
    <div className="absolute top-0 left-0 w-full h-[90vh] overflow-hidden -z-10">
      <iframe
        className="absolute top-[-5px] left-0 w-full h-[calc(100%+10px)] object-cover"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

};

export default VideoBackground;
