import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ai from "../utils/geminiapi";
import { API_OPTIONS } from "../utils/constants";
import { setRecommendations } from "../utils/gptSlice";
import { IMG_CDN } from "../utils/constants";

const GptSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const recommendations = useSelector((state) => state.gpt.recommendations);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleSearch = async () => {
    const gptQuery =
      "Act as a movie recommendation engine. Suggest some movies based on the following input: " +
      query +
      ". Only give me the comma separated movie list as shown ahead in the example result. Example Result : movie1, movie2, movie3, movie4, movie5.  If the input says any specific number other than 5 then consider that number of movies. If the input is empty or not relevant to movies then suggest 5 popular movies. Do not include any additional text other than the movie list.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const movieList = response.text
      .split(",")
      .map((movie) => movie.trim().toLowerCase());

    const data = await Promise.all(
      movieList.map((movie) => searchMovieTMDB(movie))
    );

    const allMovies = data.flat();

    const uniqueMovies = Object.values(
      allMovies.reduce((acc, movie) => {
        const titleKey = movie.title.trim().toLowerCase();
        if (movieList.includes(titleKey) && !acc[titleKey]) {
          acc[titleKey] = movie;
        }
        return acc;
      }, {})
    );

    dispatch(setRecommendations(uniqueMovies));
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      <div className="container mx-auto px-5 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Search your mood
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a movie name, genre, or actor..."
            className="w-full max-w-xl px-4 py-3 rounded-md bg-gray-800 text-white focus:outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition"
          >
            Search
          </button>
        </div>

        {/* Recommendations */}
        <div className="flex flex-col space-y-6 pb-10 px-4 sm:px-10 md:px-20">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((movie) => (
              <div
                key={movie.id}
                className="flex sm:flex-row items-start bg-gray-800 rounded-lg p-4 space-y-6 sm:space-y-0 sm:space-x-6"
              >
                {/* Poster Image */}
                <div className="h-[200px] sm:w-[200px] sm:h-[300px] flex-shrink-0 overflow-hidden rounded-md bg-gray-700">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMG_CDN}${movie.poster_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={movie.title}
                    className=" h-full object-cover"
                  />
                </div>

                {/* Movie Info */}
                <div className="flex flex-col justify-between pl-4 sm:pl-0">
                  {/* Title + Overview */}
                  <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {movie.title}
                    </h2>
                    <p className="hidden lg:block text-sm sm:text-base text-gray-300 mt-4">
                      {movie.overview
                        ? movie.overview
                        : "No description available."}
                    </p>
                  </div>

                  {/* Metadata: always at bottom */}
                  <div className="pb-2 text-gray-300 space-y-1 text-sm sm:text-base">
                    <p>
                      <span className="font-semibold">Release Date:</span>{" "}
                      {movie.release_date || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Adult Content:</span>{" "}
                      {movie.adult ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="font-semibold">Language:</span>{" "}
                      {movie.original_language.toUpperCase()}
                    </p>
                    <p>
                      <span className="font-semibold">Rating:</span> ⭐{" "}
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-10">
              No movies found. Try searching for something else.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
