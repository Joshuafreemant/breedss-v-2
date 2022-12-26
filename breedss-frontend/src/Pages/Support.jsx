import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLogin } from '../store/index';
import Footer from '../Components/Footer';
const Support = () => {
    const navigate = useNavigate()
    const dispatchs = useDispatch()

    const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }),
        { email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('email', state.email);
        formData.append('password', state.password);

        let object = {};
        formData.forEach((value, key) => (object[key] = value));
        let json = JSON.stringify(object);


        const savedUser = await fetch(process.env.REACT_APP_BASE_URL + 'auth/login', {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const loggedIn = await savedUser.json();

        if (loggedIn.token) {
            dispatchs(setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            }))
            navigate('/')
        }
        alert(loggedIn.msg)
    }

    return (
        <>
            <div className='support-body '>
                


                <form action="" className="form" onSubmit={(e) => handleSubmit(e)}>

                    <div className="font-medium">
                        <p>
                            You can get in touch with our customer service for any sort of complaint or to be more informed about our services info@breedss.com

                            {/* Follow us on all social media platforms (Facebook, Pinterest, Twitter, Instagram, YouTube) */}

                            Reach out anytime via the email above or Fill out the Form below

                        </p>
                    </div>
                    <div className="form-groups mt-6">
                        <label htmlFor="Email"></label>
                        <input
                            type="Full Name"
                            className="form-input"
                            Placeholder="Full Name"
                            value={state.email}
                            onChange={(e) => dispatch({ email: e.target.value })}
                        />
                    </div>

                    <div className="form-groups ">
                        <label htmlFor="Email"></label>
                        <input
                            type="email"
                            className="form-input"
                            Placeholder="Email Address"
                            value={state.email}
                            onChange={(e) => dispatch({ email: e.target.value })}
                        />
                    </div>

                    <div className="form-groups">
                        <label htmlFor="Password"></label>
                        <textArea
                            type="Type here..."
                            className="form-input"
                            placeholder="Password"
                            value={state.password}
                            rows='5'
                            onChange={(e) => dispatch({ password: e.target.value })}
                        />
                    </div>


                    <div className="form-groups">

                        <button className='form-button' type='submit'>Send Request</button>

                    </div>



                </form>
            </div>
            <Footer />
        </>

    )
}

export default Support