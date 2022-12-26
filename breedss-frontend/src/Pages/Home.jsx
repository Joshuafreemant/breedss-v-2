
// Import Swiper React components
import './Home.css';
import { Swiper, SwiperSlide } from "swiper/react";

import { FaTwitterSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';

// import Scroll from './Scroll/Scroll'
import { NavLink } from 'react-router-dom';

import { useEffect, useState } from "react";



import Pet_img from '../Images/post-pet.jpg';
import Bg_img from '../Images/Petgs.jpg';
import abt_img1 from '../Images/abt-img1.jpg';
import abt_img2 from '../Images/abt-img2.jpg';
import discover_dog from '../Images/discover-dog.jpg';
import discover_cat from '../Images/discover-cat.jpeg';
import discover_bird from '../Images/breedss_bird.jpg';
import discover_rabbit from '../Images/discover-rabbit.jpg';
import discover_other1 from '../Images/breedss_dog2.jpeg';

import discover_horse from '../Images/breedss_horse.jpeg';
import privacy from '../Images/safe.jpg';
import Footer from '../Components/Footer';
// Import Swiper styles
// import "swiper/css";
// import "swiper/swiper.min.css";
// import "swiper/components/effect-coverflow/effect-coverflow.min.css"
// import "swiper/components/pagination/pagination.min.css"
// // import Swiper core and required modules
// import SwiperCore, {
//     EffectCoverflow, Pagination
// } from 'swiper/core';

// // install Swiper modules
// SwiperCore.use([EffectCoverflow, Pagination]);


function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}



const Home = () => {

    return (
        <div>
            <ScrollToTopOnMount />




            <main className="main">
                <section className="homepage md:p-0 p-8" id="home">
                    <img src={Bg_img} alt="" className="home__img" />
                    <div className="home__container container grid">
                        <div className="home__data">

                            <h1 className="home__data-title">A Place For<br /> <b>Pet Owners</b>  to Connect</h1>

                            <NavLink exact to="/create-account" className="button">
                                Get Started
                            </NavLink>
                        </div>

                        <div className="home__social">
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link">   <FaInstagramSquare /></a>
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link"><FaTwitterSquare /></a>
                            <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="home__social-link"><FaFacebookSquare /></a>

                        </div>
                        <div className="home__info">
                            <div className="">
                                <span className="home__info-title">Post a Picture/Video of Your Pets</span>
                                <a href="#more" className="button button--flex button--link home__info-button">More <FaArrowRight /></a>
                            </div>

                            <div className="home__info-overlay">
                                <img src={Pet_img} alt="pet" className="home__info-img" />
                            </div>
                        </div>
                    </div>


                </section>

                <section id="more" className="about section">
                    <div className="p-8 md:p-0 flex flex-col md:flex-row items-center justify-center md:justify-around">
                        <div className="about__data">
                            <h2 className="text-3xl section__title about__title texts-dark">More Information about <br />  Breedss</h2>
                            <p className="about__description w-full md:w-[400px] mt-4 font-medium">
                                Breedss is a free, online pet media-sharing site among pet owners.
                                Breedss is like Instagram for pet-owners. It is an online platform that
                                helps pet owners showcase their pets, interact and exchange their
                                experiences while raising or owning a pet  globally.
                            </p>



                            <NavLink exact to="/create-account" className="button">Get Started</NavLink>

                        </div>
                        <div className="about__img">
                            <div className="about__img-overlay">
                                <img src={abt_img1} alt="pet" className="about__img-one" />
                            </div>

                            <div className="about__img-overlay">
                                <img src={abt_img2} alt="pet" className="about__img-two" />
                            </div>

                        </div>
                    </div>
                </section>

                <section className="discover section p-8 md:p-0">
                    <div className="container discover__container">
                        <h2 className="section__title texts-dark text-3xl md:mt-24">Discover More on Breedss</h2>
                        <p className='mt-4 font-medium'>Are you a lover of animals, pets? Now you can easily see varieties of pets through Breedss.
                            You don’t have to always be physically present to be of help to pets and pet owners
                            You don’t have to be a Vet Doctor to help pets get restored to good health.
                            Are you in need of a pet, Breedss can help you locate and adopt the best pet of your choice.
                            Explore our gallery to see myriads of pet owners’ profile and details about their pets.
                            Do you want to share your experience with raising pets, no worries. Kindly sign up here and get sharing.
                        </p>
                    </div>



                    {/* <Swiper spaceBetween={32} effect={'coverflow'} loop={true} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
                        "rotate": 0,
                        "stretch": 0,
                        "depth": 100,
                        "modifier": 1,
                        "slideShadows": true
                    }} pagination={true} className="mySwiper  container container-swipper">
                        <SwiperSlide className="discover__card">
                            <img src={discover_rabbit} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Bunnies</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Bunnies</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_dog} className="discover__img" alt="Breedss" />

                            <div className="discover__data">
                                <h2 className="discover__title">Dogs</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Dog</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_cat} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Cats</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Cats</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_bird} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Birds</h2>
                                <span className="discover__description">Post  Pictures/Videos of Your Birds</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_horse} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Horses</h2>
                                <span className="discover__description">Post Your Horses</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="discover__card">
                            <img src={discover_other1} className="discover__img" alt="Breedss" />
                            <div className="discover__data">
                                <h2 className="discover__title">Other Pets?</h2>
                                <span className="discover__description">Post Pictures/Videos of Your Pets</span>
                            </div>
                        </SwiperSlide>


                    </Swiper> */}
                    <section className="experience section mb-40">
                        <h2 className="section__title texts-dark text-3xl text-center mb-8">You're In Good Hands</h2>
                        <div className="experience__container container grid">
                            <div className="experience__content grid">
                                <div className="experience__data flex flex-col">
                                    <div className="experience__number flex flex-col items-center ">
                                        <FaHandshake className='text-5xl' />
                                        <h3>Support</h3>
                                    </div>
                                    <span className="experience__description">
                                        Breedss.com as a trusted non-profit organization  is here to support you throughout this process.
                                    </span>
                                </div>
                                <div className="experience__data">
                                    

                                    <div className="experience__number flex flex-col items-center ">
                                        <FaLock className='text-5xl mb-2' />
                                        <h3>Safe</h3>
                                    </div>
                                    <span className="experience__description">
                                        Your personal information will never be shared or shown to the public, so your experience on Breedss.com is a safe one

                                    </span>
                                </div>
                                <div className="experience__data">
                                    <div className="experience__number flex flex-col items-center ">
                                        <FaKey className='text-5xl mb-2' />
                                        <h3>Secure</h3>
                                    </div>
                                    <span className="experience__description">
                                        We take your privacy seriously. This privacy policy talks about what personal information we collect and how we use it.
                                    </span>
                                </div>
                            </div>
                            <div className="experience__img grid">
                                <div className="experience__overlay">
                                    <img src={privacy} alt="" className="experience__img-one" />
                                </div>
                                <div className="experience__overlay">
                                    <img src={discover_rabbit} alt="" className="experience__img-one" />
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
                {/* <Scroll /> */}

                <Footer />


            </main>
        </div>
    )
}
export default Home;

