import React from "react";
import { Link } from "react-router-dom";
import { MdEmail } from 'react-icons/md';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaLocationArrow, FaSearchLocation, FaMailBulk, FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF, FaTelegram } from 'react-icons/fa';
function Footer() {

  const socialMediaLinks = [
    {
      icon: <FaFacebookF />,
      link: "#",
    },
    {
      icon: <FaTwitter />,
      link: "#",
    },
    {
      icon: <FaInstagram />,
      link: "#",
    },
    {
      icon: <FaLinkedinIn />,
      link: "#",
    },
    {
      icon: <FaTelegram />,
      link: "https://web.telegram.org/",
    },
  ];


  return (
    <section className="border-top bg-[#293A77] footer pt-6">
      <div className="container ">
        <div className="row">
          <div className="col-md-4 text-white">
            <h5 className="text-white">company Info</h5>
            <hr />
            <p className="text-white">
            CINHUB is a premier online destination for movie enthusiasts, offering a comprehensive film database, personalized recommendations, and a vibrant community. By continuously innovating and adapting to evolving user needs.
            </p>
          </div>
          <div className="col-md-4 text-white">
            <h5>Quick link</h5>
            <hr />
            <div>
              <Link to="/ ">Home</Link>
            </div>
            <div>
              <Link to="/about">About</Link>
            </div>
            <div>
              <Link to="/contact">Contact</Link>
            </div>
            <div>
              <Link to="/help">Service</Link>
            </div>
          </div>
          <div className="col-md-4 text-white ">
  <h5 className="text-white">Social Media</h5>
  <hr />
  <div className="flex justify-center space-x-6 py-2">
    {socialMediaLinks.map((item, index) => (
      <a
        key={index}
        href={item.link}
        className="text-white glow w-10 h-10 rounded-full bg-transparent flex justify-center items-center"
      >
        {item.icon}
      </a>
    ))}
  </div>
</div>
        </div>
      </div>
    </section>
  );
}
export default Footer;
