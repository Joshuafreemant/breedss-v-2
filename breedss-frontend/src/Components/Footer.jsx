import './Footer.css'
import { FaTwitterSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
export default function Footer() {

    let date =new Date()
    return (
        <div>
            <footer className="footer section">
                <div className="footer__container container grid">
                    <div className="footer__content grid">
                        <div className="footer__data">
                            <h3 className="footer__title">Breedss</h3>
                            <p className="footer__description mt-6 w-[300px] md:[350px]">Often times than not, when raising pets, we encounter certain problems that gets us worried,  if only there was an avenue to always ask those bugging questions on our mind.
                                Breedss is founded for this sole purpose. It has been our aim to help pet-parent share their experiences in order to help others around the world going through similar issue with their pet(s).
                               
                            </p>
                            <div className='flex gap-2 mt-6'>
                                <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="footer__social">
                                
                                    <FaFacebookSquare />
                                </a>
                                <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="footer__social">
                                    <FaTwitterSquare />
                                </a>
                                <a href="https://www.fb.com" target="_blank" rel="noreferrer" className="footer__social">
                                    <FaInstagramSquare />
                                </a>
                               
                            </div>
                        </div>
                        <div className="footer__data">
                            <h3 className="footer__subtitle text-2xl">About</h3>

                            <ul className='flex flex-col gap-4'>
                                <li className="footer__item"><NavLink exact to="/about" className="footer__link">About Us </NavLink></li>
                                <li className="footer__item"><NavLink exact to="/accessibility-policy" className="footer__link">Accessibility Policy </NavLink></li>
                                <li className="footer__item"><NavLink exact to="/privacy-policy" className="footer__link">
                                    Privacy Policy
                                </NavLink></li>

                            </ul>
                        </div>

                        <div className="footer__data">
                            <h3 className="footer__subtitle">Quick Links</h3>

                            <ul className='flex flex-col gap-4'>
                                <li className="footer__item"><NavLink exact to="/login" className="footer__link">
                                    Login
                                </NavLink></li>
                                <li className="footer__item"><NavLink exact to="/create-account" className="footer__link">
                                    Sign Up
                                </NavLink></li>

                                <li className="footer__item"><NavLink exact to="/how-to-use" className="footer__link">
                                    How To Use
                                </NavLink></li>


                            </ul>
                        </div>

                        <div className="footer__data">
                            <h3 className="footer__subtitle">Support</h3>

                            <ul className='flex flex-col gap-4'>
                                <li className="footer__item">
                                    <NavLink exact to="/terms-and-conditions" className="footer__link">
                                        Terms and Conditions
                                    </NavLink></li>
                                <li className="footer__item"><NavLink exact to="/faq" className="footer__link">
                                    FAQs
                                </NavLink></li>
                                <li className="footer__item">
                                    <NavLink exact to="/support" className="footer__link">
                                        Contact Support
                                    </NavLink></li>


                            </ul>
                        </div>
                    </div>

                    <div className="footer__rights">
                        <p className="footer__copy">
                            &#169; {date.getFullYear()} Breedss. All rights Reserved
                        </p>

                        <div className="footer__terms">
    
                            <NavLink exact to="/terms-and-conditions" className="footer__terms-link">
                            Terms and Agreements
                            </NavLink>


                            <NavLink exact to="/privacy-policy" className="footer__terms-link">
                                Privacy Policy
                            </NavLink>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
