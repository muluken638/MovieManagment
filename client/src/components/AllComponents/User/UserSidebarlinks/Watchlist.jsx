import React, { useState, useEffect } from "react";
import axios from "axios";
import MyNavbar from "../../MyNavbar";
import Sidebar from "../UserShared/SidebarUser";
import { FaHeart } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import cardimage from "../../../image/TitanicThumbnail.jpg";
import image1 from "../../../image/leorando titanic cast.jpg";
import image2 from "../../../image/action2.jpg";
import image3 from "../../../image/action3.jpg";
const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [imageCards, setImageCards] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [clickedCardIndex, setClickedCardIndex] = useState(-1);
  const fetchMovieList = () => {
    axios
      .get("http://localhost:3001/genres")
      .then((response) => {
        setMovies(response.data);
        setImageCards(
          response.data.map((movie) => ({
            image: "https://via.placeholder.com/300x200",
            // image:movie.image,

            // image: "https://via.placeholder.com/300x200",
            image: movie.image,

            title: movie.title,
            genre: movie.genre,
            director: movie.director,
          }))
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredCards = selectedGenre
    ? imageCards.filter((card) => card.genre.includes(selectedGenre))
    : imageCards;

  const clicked = () => {
    console.log("add button clicked");
  };

  /// heart clicked
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const [heartStates, setHeartStates] = useState(
    filteredCards.map(() => false)
  );

  const handleHeartClick = (index) => {
    setHeartStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  return (
    <>
      <MyNavbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto pl-3 ">
          <div>
            <h1 className="pb-3">Watch Lists </h1>
          </div>
          <div className="flex flex-col pl-2  flex-1  w-full ">
            <div className="flex flex-2 flex-row  bg-white p-2">
              <div className=" rounded-lg shadow-md p-2 cursor-pointer h-full w-full">
                <img src={cardimage} style={{width:'100%',height:'100%'}} />
              </div>
              <div className=" flex flex-4 flex-col pt-4 text-lg text-blue-600 font-serif  ">
                <div className="flex pl-2 gap-4">
                  <div>Title</div>
                  <div>Titanic</div>
                </div>
                <div className="flex pl-2 gap-6">
                  <div>Director</div>
                  <div>Titanic</div>
                </div>
                <div className="flex pl-2 gap-5">
                  <div>Duration</div>
                  <div>12:30minutes</div>
                </div>
                <div className="flex pl-2 gap-3">
                  <div>Relesed Year</div>
                  <div>2020/12/6 GC</div>
                </div>
                <div className="flex pl-2  gap-4">
                  <div>Description</div>
                  <div className="text-sm">
                    "Titanic" is a 1997 epic romantic disaster film directed,
                    written, co-produced, and co-edited by James Cameron,
                    depicting the 1912 sinking of the RMS Titanic and the story
                    of two young passengers from different social classes,
                    Leonardo DiCaprio as Jack Dawson and Kate Winslet as Rose
                    DeWitt Bukater, who fall in love aboard the ill-fated maiden
                    voyage of the ship, facing enormous challenges as the
                    Titanic collides with an iceberg and begins to sink, with
                    the film becoming a critical and commercial juggernaut,
                    winning 11 Academy Awards including Best Picture and
                    cementing its place as one of the most iconic films in
                    cinema history.
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
            <h1 className="pb-3">Casts </h1>
              <div className="flex flex-row  gap-4 bg-white h-[100px]">
                {filteredCards.map((card, index) => (
                  <div
                    className="rounded-lg shadow-md p-1 cursor-pointer"
                    key={index}
                  >
                    <img src={cardimage} className="h-[100%] w-[150px]" />
                    <p className="py-2">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <p className="pt-4 text-slate-600 font-serif text-lg">
                Recommended
              </p>
              <div className="flex flex-row overflow-x-auto gap-4 bg-white h-[150px]">
                {/* Recommended card components go here */}
                <div className="rounded-lg shadow-md p-1 cursor-pointer">
                  <img src={image1} className="h-[90%] w-[300px]" />
                </div>
                <div className="rounded-lg shadow-md p-1 cursor-pointer">
                  <img src={image2} className="h-[90%] w-[300px]" />
                </div><div className="rounded-lg shadow-md p-1 cursor-pointer">
                  <img src={image3} className="h-[90%] w-[300px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
