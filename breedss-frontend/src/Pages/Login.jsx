import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setLogin } from '../store/index';
import HorizontalAds from '../Components/HorizontalAds';

import { BsEyeSlash, BsEyeSlashFill } from "react-icons/bs";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate()
    const dispatchs = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)


    const togglePassword = (e) => {
        e.preventDefault()
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown((prev) => !prev)
    }
    const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }),
        { email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('email', state.email);
        formData.append('password', state.password);

        let object = {};
        formData.forEach((value, key) => (object[key] = value));
        let json = JSON.stringify(object);


        const savedUser = await fetch(process.env.REACT_APP_BASE_URL + 'auth/login', {
            method: 'POST',
            mode: 'cors',
            body: json,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

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

        else {
            setIsLoading(false)
            let notify = () => {
                toast.error((loggedIn.msg), {
                    toastClassName: 'error'
                })
            };
            notify()
        }
    }

    return (
        <div className='login-body'>
            <ToastContainer />



            <form action="" className="mt-40 mb-40 form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-groups">
                    <label htmlFor="Email"></label>
                    <input
                        type="email"
                        className="form-input  outline-none"
                        Placeholder="Email Address"
                        value={state.email}
                        onChange={(e) => dispatch({ email: e.target.value })}
                    />
                </div>

                <div className="form-groups">
                    <div className="password flex items-center w-full justify-between px-3">
                        <input
                            type={passwordShown ? "text" : "password"}
                            className="p-[10px] w-11/12 outline-none"
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => dispatch({ password: e.target.value })}
                        />
                        {passwordShown ? (
                            <button onClick={(e) => togglePassword(e)}>
                                <BsEyeSlash  className='h-5 w-5'/>
                            </button>

                        ) : (
                            <button onClick={(e) => togglePassword(e)}>
                                <BsEyeSlashFill className='h-5 w-5'/>
                            </button>
                        )}
                    </div>

                </div>


                <div className="form-groups">

                    {isLoading ?
                        <button className='form-button' type='button'>Loading....</button> :
                        <button className='form-button' type='submit'>Log In</button>}

                </div>
                <div className='links'>
                    <Link exact to="/forgot" className="login__in-link">
                        Forgot Password?
                    </Link>

                    <Link exact to="/create-account" className="login__in-link">
                        Sign Up
                    </Link>
                </div>


            </form>
            <div className="">
                <HorizontalAds slot="8217530327568975" googleAdId="ca-pub-8217530327568975" />


            </div>

        </div>
    )
}

export default Login