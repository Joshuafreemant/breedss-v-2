
import './Faq.css'
import { useEffect } from "react";
import Footer from '../../Components/Footer';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default function Faqs() {
    return (
        <div>
            <ScrollToTopOnMount />


            <section className="faqs section p-8 md:p-0">
                <div className="faqs__title container">
                    <h1 className="faq__heading mt-32 texts-dark">
                        FAQs
                    </h1>
                    <h3>Got questions? We’re here to answer them! If you don’t see your question here, you can drop it on our Contact Page.</h3>
                </div>
                <div className="faqs__container container">
                    <details>
                        <summary className='font-medium'>Will my profile be accessible to any visitor of the site?</summary>
                        <p>No, it won’t. Breedss ensures 100% confidentiality of its members. Nonetheless, your profile name might be displayed, but asides that nothing will be accessible to just any visitor of the site, except for other fellow members, that will be with your permission of course.</p>
                    </details>

                    {/* <details>
                        <summary>Title</summary>
                        <p>Paragraph is here beware</p>
                    </details> */}

                </div>
            </section>
            <Footer />

        </div>
    )
}
