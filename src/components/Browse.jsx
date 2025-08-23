import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className="">
      <div className="absolute top-0 left-0 w-full z-30">
        <Header />
      </div>
      <MainContainer />
    </div>
  );
};

export default Browse;
