import React from "react";
import { Link } from "react-router-dom";
import Slider from "../inc/slider";
import Vms from "../inc/mission";
import Navbar from "../inc/navbar";
import image1 from "../image/action2.jpg";
import image3 from "../image/action5.jpg";
import image2 from "../image/comeddy.jpg";
import image4 from "../image/romance.png";
import image5 from "../image/romance.jpg";
import Footer from "../inc/footer";
import MyNavbar from "../inc/HomeNavbar";
import { useState , useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Swiper, SwiperSlide } from 'swiper/react'
import Project1 from '../image/romance.jpg'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// import { Pagination, Autoplay } from 'swiper';
import About from "./About";
function Home() {
  
  // const Projects = [
  //   {
  //     name: 'Project1',
  //     img:image1,
  //     link: "https://github.com/muluken638/project1",
  //     liveLink: "https://project1.example.com"
  //   },
  //   {
  //     name: 'Project2',
  //     img: image2,
  //     link: "https://github.com/muluken638/project2",
  //     liveLink: "https://project2.example.com"
  //   },
  //   {
  //     name: 'Project3',
  //     img: image3,
  //     link: "https://github.com/muluken638/project3",
  //     liveLink: "https://project3.example.com"
  //   },
  //   {
  //     name: 'Project4',
  //     img: image4,
  //     link: "https://github.com/muluken638/project4",
  //     liveLink: "https://project4.example.com"
  //   },
  //   {
  //     name: 'Project5',
  //     img: image5,
  //     link: "https://github.com/muluken638/project5",
  //     liveLink: "https://project5.example.com"
  //   }
  // ];
 
const [Projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('http://localhost:8080/FilmsPostures');
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://localhost:8080/services');
      const data = await response.json();
      setServices(data);
    };
    fetchServices();
  }, []);
  const handleCardClick = (filmId) => {
    // Add your logic here to handle the card click
    console.log('Clicked on film with ID:', filmId);
  };
  return (
    <div>
      <MyNavbar />

      <div className="">
      <section id="projects" className=" bg-gray-800 relative h-screen">
  <div className="flex max-w-6xl  mx-auto items-center justify-center">
    <div className="  w-full flex justify-center align-middle pt-20">
      <Swiper
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          // disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {Array.isArray(Projects) && Projects.length > 0 ? (
          Projects.map((project_info, i) => (
            <SwiperSlide key={i}>
              <div className=" w-full p-1 bg-slate-700 rounded-xl h-3/4 ">
                <img
                  src={project_info.image}
                  alt=""
                  className="rounded-lg  h-full object-cover"
                />
                {/* <h3 className="text-xl mx-4 my-2">{project_info.title}</h3> */}
                
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Swiper>
    </div>
  </div>
</section>
        <Vms />
        <section className="section border-top bg-slate-700 py-4">
  <div className="container">
    <div className="row">
      <div className="col-md-12 mb-4 text-center">
        <h3 className="main-heading ">Recommended Films</h3>
        <div className="underline "></div>
      </div>
      {services.map((Films) => (
        <div
          className={`col-12 col-md-6 col-lg-3 text-center mb-4`}
          key={Films.id}
        >
          <div
            className="card shadow h-100 transform-on-click"
            onClick={() => handleCardClick(Films.id)}
          >
            <img
              src={Films.image}
              className="w-100 border-bottom"
              alt={Films.title}
            />
            <div className="card-body d-flex flex-column">
              <h6 className="mb-2">{Films.title}</h6>
              <div className="underline mx-auto mb-2"></div>
              <p className="mb-auto">{Films.description}</p>
              <Link to="/services" className="btn btn-link mt-3">
                read more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
