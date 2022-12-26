
import './About.css';
import { useEffect } from "react";
import Footer from '../../Components/Footer';
import HorizontalAds from '../../Components/HorizontalAds';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default function About() {
    return (
        <div>
            <ScrollToTopOnMount />
            <section className="section about__section p-8 md:p-0">
                <div className="container about__container-page mt-40">
                    <h1 className='mt-40  texts-dark'>About Us</h1>

                    <div className="about__description-page mt-8">
                        <h1 className='text-xl'>Brief Intro</h1>
                        <p>
                            Breedss is a free, online pet media-sharing website among pet owners.
                        </p>

                        <h1 className='text-xl'>Brief History/State a Problem</h1>

                        <p>

                            Often times than not, when raising pets, we encounter certain problems that gets us worried, but we fail to realize that we are not the first to raise pets and we wont be the last to, if only there was an avenue to always ask those bugging questions on our mind.
                            <br />
                            Breedss was founded in (the year) for this sole purpose. It has been our aim to help pet-parent share their experiences in order to help others around the world going through similar issue with their pet(s).
                        </p>
                        <blockquote cite="http://www.worldwildlife.org/who/index.html">

                        </blockquote>
                        <p>“Often, we are too slow to recognize how much and in what ways we can assist each other through sharing expertise and knowledge.”

                        </p>
                        <p>Owen Arthur.
                        </p>
                        <p>(1949, Barbadian politician)</p>

                    </div>
                    <HorizontalAds slot="8217530327568975"/>

                </div>
            </section>

            <Footer />
        </div>
    )
}
