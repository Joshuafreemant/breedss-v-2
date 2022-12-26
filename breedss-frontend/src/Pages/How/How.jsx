
import './How.css'
import { useEffect } from "react";
import Footer from '../../Components/Footer';
import HorizontalAds from '../../Components/HorizontalAds';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default function How_to() {
    return (
        <div>
            <ScrollToTopOnMount />

            <section className="section how__to-section md:p-0 p-8">
                <div className="container how__to-container mt-24 md:mt-40">
                    <h1 className='mt-40 texts-dark'>How to Use</h1>
                    <div className="how_to_use-content">
                        <p>Breedss is a free, online pet media-sharing website among pet owners.
                            Breedss is like Instagram for pet-owners. It is an online platform that helps pet owners showcase their pets, interact and exchange their experiences globally.
                        </p>

                        <p>Issues about various kind of pet can be discussed. Photos, videos can be shared with captivating captions, comments can also be made, recommendations and advices are also allowed.</p>

                        <p>All you need do when you visit the site is, click the sign-up button, fill in the required details, create an account and then log in. Now you have a profile on Breedss, glance through all the functions within your profile, you can optimize it, upload pictures, videos, write a bio, follow other pet owners, like their videos or pictures all on Pet Socials.</p>


                        <p>Some pet owners want to give out their pets but are scared of who to give their pets to. Breedss helps bridge this gap by introducing an adoption feature, where wannabe pet parent(s) can be interview by an already known pet owners to know if they are suitable and capable of adopting a pet that is put up for adoption. On request, they can get to see pictures as well as videos of pets they are interested in.</p>
                        <p>Pets of various kinds are displayed here, ranging from dogs, cats, to birds, guinea pigs, hamster, snakes, ferret, fish, rabbit, and more. There can be forums to discuss about feeding, accessorizing, training, health treatment and many more activities for pets. Where one or two persons can suggest or recommend the best feeding and treatment plans for pet.</p>
                        {/* <p>There is also an Ecommerce aspect that specifically deals with sales of all kinds of products for pets and actual pets for those who are interested in buying. There is also an adoption scheme for pets whose owner want to put them up.</p> */}
                    </div>
                    <HorizontalAds slot="8217530327568975" googleAdId="ca-pub-8217530327568975"/>



                </div>


            </section>

            <Footer />

        </div>
    )
}
