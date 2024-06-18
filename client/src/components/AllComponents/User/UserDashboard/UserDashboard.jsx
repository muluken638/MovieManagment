import React, { useState, useEffect } from "react";
import axios from "axios";
import MyNavbar from "../../MyNavbar";
import Sidebar from "../UserShared/SidebarUser";
import { FaHeart } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const UserDashboard = () => {
  
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [heartStates, setHeartStates] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
const navigate=useNavigate();
  const fetchMovieList = () => {
    axios
      .get("http://localhost:8080/movielist")
      .then((response) => {
        setMovies(response.data);

        setHeartStates(response.data.map(() => false));
=======
        setImageCards(
          response.data.map((movie) => ({


            // image :"https://via.placeholder.com/300x200",
            // image:movie.image,

            //image: "https://via.placeholder.com/300x200",

            image: movie.image,
            title: movie.title,
            genre: movie.genre,
            director: movie.director,
          }))
        );

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

  const handleHeartClick = (index, movieId) => {
    const newHeartStates = [...heartStates];
    newHeartStates[index] = !newHeartStates[index];
    setHeartStates(newHeartStates);

    addToWishlist(movieId);
  };

  const addToWishlist = (movieId) => {
    setWishlistLoading(true);
    axios
      .post(`http://localhost:8080/add-to-wishlist/${movieId}`)
      .then((response) => {
        console.log("Movie added to wishlist:", response.data);
        window.alert("wish list added successfully");
        navigate("/watchlists");
        setWishlistLoading(false);
        // Handle success (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error adding movie to wishlist:", error);
        setWishlistLoading(false);
        // Handle error (e.g., show an error message)
      });
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;


=======
  const handleHeartClick = (index) => {
    setHeartStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <MyNavbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto pl-3">
          <div>
            <h1 className="pb-3">Categories</h1>
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
=======
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white justify-center align-middle cursor-pointer">
            {filteredCards.map((card, index) => (
              <div className=" rounded-lg shadow-md p-1 border-2 border-[#D0D5DD] border-solid border-transparent hover:border-[#D0D5DD] transition-all duration-300 cursor-pointer " key={index}>
                <div className="flex gap-3">
                    <div className="text-bold text-14 text-blue-600">
                      Film Title:{" "}
                    </div>
                    
                    <div>
                      <h6 className="text-12">{card.title}</h6>
                    </div>{" "}
                  </div>
                <img src={cardimage} className="h-[250px] w-full p-2" />

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
                    </div>{" "}
                  </div>
                </div>
                <div className="flex justify-between align-bottom mb-2 px-2">
                  <div
                    className={`cursor-pointer ${heartStates[index] ? "text-red-500" : ""}`}
                    onClick={() => handleHeartClick(index, movie.id)} // Ensure movie.id is used here
                  >
                    <span style={{ color: "red" }}>Like/Dislike</span>
                    <FaHeart />
                  </div>
                  <div className="cursor-pointer" onClick={() => addToWishlist(movie.id)}> {/* Ensure movie.id is used here */}
                    <span className="text-[#293A77] ">Add to wish list</span>
                    <IoAdd />
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

export default UserDashboard;
