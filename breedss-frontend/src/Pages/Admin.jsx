import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import photo from '../Images/addAvatar.png'
import Dropzone from 'react-dropzone'
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setLogin } from "state";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    fullName: "",
    username: "",
    email: "",
    password: "",
};


const Admin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (values, onSubmitProps) => {

        const formData = new FormData();
        

        const savedUserResponse = await fetch(
            process.env.REACT_APP_BASE_URL + 'auth/register/admin',
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            navigate('/')
        }
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await handleSubmit(values, onSubmitProps);
    };


    return (
        <div className='register-body'>
            <h2 className="text-2xl text-white text-center mb-8 mt-24">
                Set Up your Account
            </h2>


            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesRegister}
                validationSchema={registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-groups">
                            <label htmlFor="Fullname"></label>
                            <input
                                type="text"
                                className="form-input"
                                Placeholder="Fullname "
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fullName}
                                name="fullName"
                                error={
                                    Boolean(touched.fullName) && Boolean(errors.fullName)
                                }
                                helperText={touched.fullName && errors.fullName}
                            />
                        </div>

                        <div className="form-groups">
                            <label htmlFor="Email"></label>
                            <input type="email"
                                className="form-input"
                                Placeholder="Email Address "
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={
                                    Boolean(touched.email) && Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                            />
                        </div>

                        <div className="form-groups">
                            <label htmlFor="Username"></label>
                            <input
                                type="text"
                                className="form-input"
                                Placeholder="Username "
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={
                                    Boolean(touched.username) && Boolean(errors.username)
                                }
                                helperText={touched.username && errors.username}
                            />
                        </div>



                        <div className="form-groups">
                            <label htmlFor="Password"></label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Password "
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={
                                    Boolean(touched.password) && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                            />
                        </div>






                        <div className="form-groups">

                            <button className='form-button' type='submit'>Sign Up</button>
                        </div>

                        <div>
                            <p className='form-text'>Already have an account? <Link exact to="/" className="login__in-link">
                                Login
                            </Link></p>
                        </div>

                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Admin