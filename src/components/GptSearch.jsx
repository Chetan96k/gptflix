import React, { useState } from "react";
import Header from "./Header";
import ai from "../utils/geminiapi";

const GptSearch = () => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    // Here you can call API or show recommendations
    const gptQuery =
      "Act as a movie recommendation engine. Suggest some movies based on the following input: " +
      query +
      ". Only give me the comma separated movie list as shown ahead in the example result. Example Result : movie1, movie2, movie3, movie4, movie5.";
      
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });
    const movieList = response.text.split(",").map((movie) => movie.trim());
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />

      <div className="container mx-auto px-5 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Search your mood
        </h1>

        {/* Search Bar Section */}
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

        {/* Placeholder for Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Example Movie Card */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="h-60 bg-gray-700 rounded-md mb-4"></div>
            <h2 className="text-lg font-semibold">Movie Title</h2>
            <p className="text-sm text-gray-300 mt-2">
              Brief movie description or genre
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="h-60 bg-gray-700 rounded-md mb-4"></div>
            <h2 className="text-lg font-semibold">Another Movie</h2>
            <p className="text-sm text-gray-300 mt-2">
              Brief movie description or genre
            </p>
          </div>

          {/* Add more cards dynamically when implementing logic */}
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
