import './Accessibility.css'
import { useEffect } from "react";
import Footer from '../../Components/Footer';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

export default function Accessibility() {
    return (
        <div>
            <ScrollToTopOnMount />
            <section className="section accessibility__section p-8 md:p-0">
                <div className="container accessibilty__container">
                    <h1 className='mt-32'>Accessibility Policy</h1>

                    <div className="accessibility__content">
                        <p>Breedss is obligated to providing you with accessible websites, applications, online services and similar interactive services (each a “Website”) to all visitors, including people with disabilities. Breedss has enacted this Website Accessibility Statement in order to further ensure we provide goods, services, information and various experiences to all of our customers.</p>

                        <p>Breedss has a third-party digital accessibility partner to help assist in adopting and implementing procedures in support of the World Wide Web Consortium’s Web Content Accessibility Guidelines (“WCAG”) 2.1 Level AA (“WCAG 2.1 AA”), as its web accessibility standard for its Websites. Breedss continues to make WCAG conformance of its Websites a key focus of its software development and design efforts.</p>

                        <p>Breedss conducts periodic Website accessibility audits to ensure continued accessibility for its Websites in conformance with WCAG 2.1 AA. In a dynamic, ever-changing technology environment, Breedss very much understands the importance of continually testing its digital properties to ensure consistent experiences are delivered.</p>

                        <p>Please note that our Websites may link to, or interface with, third-party sites that we do not control and which are not affiliated directly with Breedss. These third-party vendors may not have undertaken the same efforts that Breedss has to comply with the WCAG standards. As regards such, Breedss does not make representations regarding the accessibility and compliance with the ADA (or other applicable laws) of third-party sites. In addition, third-party vendors provide some content, plugins and widgets on our Websites. While we ask those third-party vendors to ensure accessibility, we cannot ensure their conformance, but commit to continuously working with them to ensure updates are made consistently to improve the customer experience for all.</p>

                        <p> <strong>Contact Us With Any Accessibility Questions or Comments: </strong>
                            Please send any specific questions or concerns about the accessibility of any webpage or function on our Website to (Inquiry mail) If you do encounter an accessibility issue, we appreciate you letting us know and we will make all reasonable efforts to improve the accessibility of that page.
                        </p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}
