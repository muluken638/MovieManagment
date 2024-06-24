import React, { useState } from "react";

function Vms() {
  const [showMission, setShowMission] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showVision, setShowVision] = useState(false);

  const toggleMission = () => {
    setShowMission(!showMission);
  };

  const toggleGoal = () => {
    setShowGoal(!showGoal);
  };

  const toggleVision = () => {
    setShowVision(!showVision);
  };

  return (
    <section className="section bg-gray-800 border-top text-white py-10">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-4 text-center">
            <h3 className="main-heading">Vision , Mission and Goal</h3>
            <div className="underline mx-auto"></div>
          </div>
          <div className="col-md-4 text-center border-right pr-4 border-white">
            <h6>Our Vision</h6>
            <p>
              {showVision ? (
                <>
                  To be the premier online destination that empowers movie enthusiasts to explore, engage, and elevate their cinematic experiences.
                  <button onClick={toggleVision}className="btn-read glow">Read Less</button>
                </>
              ) : (
                <button onClick={toggleVision}className="btn-read glow">Read More</button>
              )}
            </p>
          </div>
          <div className="col-md-4 text-center border-right pr-4 border-white">
            <h6>Our Mission</h6>
            <p>
              {showMission ? (
                <>
                  At CINHUB, our mission is to:

                  Curate a Comprehensive Collection: Build an extensive and diverse database of films, from the latest blockbusters to timeless classics, across all genres and eras.
                  Deliver Personalized Recommendations: Leverage advanced algorithms and expert curation to provide users with tailored movie recommendations based on their preferences and viewing history.
                  Foster a Vibrant Community: Create a dynamic and interactive platform where movie enthusiasts can connect, discuss, and share their passion for cinema.
                  Celebrate the Art of Filmmaking: Offer in-depth analyses, behind-the-scenes insights, and thought-provoking content that deepens users' appreciation for the art and craft of filmmaking.
                  Inspire and Educate: Empower users to expand their cinematic horizons, discover hidden gems, and develop a deeper understanding and love for the medium of film.
                  Continuously Innovate: Stay at the forefront of evolving technologies and user preferences to deliver a seamless and enriching experience for our growing community of movie lovers.
                  By fulfilling this mission, CINHUB aims to become the go-to destination for movie enthusiasts, providing them with the tools, resources, and community to fully immerse themselves in the captivating world of cinema.
                  <button onClick={toggleMission}className="btn-read">Read Less</button>
                </>
              ) : (
                <button onClick={toggleMission}className="btn-read">Read More</button>
              )}
            </p>
          </div>
          <div className="col-md-4 text-center border-right pr-4 border-white">
            <h6>Our Goal</h6>
            <p>
              {showGoal ? (
                <>
                  CINHUB's overarching goals are to continuously expand its comprehensive film database, enhance the user experience with a sleek and intuitive platform, deliver personalized movie recommendations powered by advanced algorithms, foster an engaged community of cinema enthusiasts through interactive features and events, provide in-depth and insightful content that educates and inspires users, and pursue strategic partnerships and integrations to expand the reach and capabilities of the website. By achieving these goals, CINHUB aims to solidify its position as the premier online destination for movie lovers, offering a seamless, personalized, and enriching platform that celebrates the art of filmmaking and brings together a thriving community of cinephiles.
                  <button onClick={toggleGoal} className="btn-read glow ">Read Less</button>
                </>
              ) : (
                <button onClick={toggleGoal} className="btn-read glow">Read More</button>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vms;