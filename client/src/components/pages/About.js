import MyNavbar from "../inc/HomeNavbar";
import Footer from "../inc/footer";
import Vms from "../inc/mission";
import Home from "./Home";

function About() {
    return (
        <>
        <MyNavbar/>
        {/* <Home/> */}
         <div class="pt-10 bg-gray-800 h-screen">
            <section className="section">
                <div className='container py-20'>
                    <div className='row'>

                        <div className='col-md-12 text-center text-white'>
                            <h3 className='main-heading'>About Us</h3>
                            <div className='underline mx-auto text-white'></div>
<p>  
          <h4 className="text-4xl uppercase font-bold text-white">
            CI<span className="text-cyan-600">NE</span>HUB
          </h4>
        is the ultimate destination for movie enthusiasts. Our mission is to provide a immersive and personalized experience for all your cinematic needs.

Launched in 2023, CINHUB has quickly become a leading platform for movie lovers to discover, discuss, and engage with the world of cinema. Our comprehensive database features an extensive collection of films, from the latest blockbusters to classic masterpieces, spanning various genres and eras.

At the heart of CINHUB is our commitment to delivering exceptional content and tools to enhance your movie-watching journey. Our team of film experts curates personalized recommendations based on your preferences, ensuring you never miss a hidden gem. Dive into in-depth movie reviews, insightful analysis, and behind-the-scenes stories that offer a deeper appreciation for the art of filmmaking.

But CINHUB is more than just a movie database - it's a vibrant community where cinephiles come together to share their passion. Engage in lively discussions, participate in interactive features, and connect with like-minded movie enthusiasts from around the world. Together, we celebrate the power of cinema to inspire, entertain, and provoke thought.

Whether you're a casual moviegoer or a dedicated cinephile, CINHUB is your one-stop-shop for all things film. Explore our vast library, discover new favorites, and unlock the magic of the silver screen. Join us on this cinematic adventure and let CINHUB be your gateway to the captivating world of movies.</p>
                        </div>
                    </div>
                </div>

            </section>
            {/* <Vms /> */}
            <Footer />

        </div>
        </>
       
    );
}
export default About;