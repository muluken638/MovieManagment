import React, { useState, useEffect } from "react";
import MyNavbar from "../../MyNavbar";
import Sidebar from "../UserShared/SidebarUser";
import { FaHeart } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";

import axios from "axios";
function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [heartStates, setHeartStates] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const fetchMovieList = () => {
    axios
      .get("http://localhost:8080/wishlistview")
      .then((response) => {
        setMovies(response.data);
        setHeartStates(response.data.map(() => false));
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;

  return (
    <>
      <MyNavbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto pl-3">
          <div>
            <h3 className="pb-3">Your Watchlist Categories</h3>
          </div>
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ overflowX: "scroll" }}>
            <button className="bg-[#293A77] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleGenreClick("")}>
              All
            </button>
            {movies
              .reduce((genres, movie) => {
                movie.genre.split(",").forEach((genre) => {
                  if (!genres.includes(genre.trim())) {
                    genres.push(genre.trim());
                  }
                });
                return genres;
              }, [])
              .map((genre, index) => (
                <button
                  key={index}
                  className="bg-[#293A77] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
          </div>

          <div>
            <h1>{selectedGenre || "All Movies"}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white justify-center align-middle">
            {filteredMovies.map((movie, index) => (
              <div className="rounded-lg shadow-md p-1" key={index}>
                <div className="flex gap-3">
                  <div className="text-bold text-14 text-blue-600">Film Title: </div>
                  <div>
                    <h6 className="text-12">{movie.title}</h6>
                  </div>{" "}
                </div>
                <img src={movie.image} className="h-[250px] w-full p-2" />
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    {" "}
                    Director:
                    <div>
                      <h6 className=" text-12">{movie.director}</h6>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div>Genre: </div>
                    <div>
                      <h6 className="text-12">{movie.genre}</h6>
                    </div>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist
