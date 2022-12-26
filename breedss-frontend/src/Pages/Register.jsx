import React, { useEffect, useReducer, useState } from 'react'
import { Link } from "react-router-dom";
import photo from '../Images/addAvatar.png'
import Dropzone from 'react-dropzone'
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsEyeSlash, BsEyeSlashFill } from "react-icons/bs";

// import { setLogin } from "state";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const registerSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    username: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const initialValuesRegister = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    picture: "",
};


const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)

    const togglePassword = (e) => {
        e.preventDefault()
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown((prev) => !prev)
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (values, onSubmitProps) => {
        setIsLoading(true)
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch(
            process.env.REACT_APP_BASE_URL + 'auth/register',
            {
                method: "POST",
                body: formData,
            }
        );

        const savedUser = await savedUserResponse.json();


        if (savedUser.error) {
            setIsLoading(false)
            if (savedUser.error.includes('duplicate key error collection')) {
                let notify = () => {
                    toast.error(('Email already in use'), {
                        toastClassName: 'error'
                    })
                };
                notify()
            }

        } else (
            navigate('/')

        )
        // onSubmitProps.resetForm();

    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await handleSubmit(values, onSubmitProps);
    };


    return (
        <div className='register-body'>
            <ToastContainer />

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
                    <form className="form mt-20" onSubmit={handleSubmit}>
                        <div className="form-groups">
                            <p className='mb-3 texts-dark'>Fill all Fields</p>
                            <label htmlFor="Fullname"></label>
                            <input
                                type="text"
                                className="form-input outline-none"
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
                                className="form-input outline-none"
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
                                className="form-input outline-none"
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
                            <div className="border border-[#14505C] mb-4 rounded password flex items-center w-full justify-between px-3">

                                <input
                                    type={passwordShown ? "text" : "password"}

                                    className="p-[10px] w-11/12  outline-none"
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

                                {passwordShown ? (
                                    <button onClick={(e) => togglePassword(e)}>
                                        <BsEyeSlash className='h-5 w-5' />
                                    </button>

                                ) : (
                                    <button onClick={(e) => togglePassword(e)}>
                                        <BsEyeSlashFill className='h-5 w-5' />
                                    </button>
                                )}

                            </div>
                        </div>











                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                                setFieldValue("picture", acceptedFiles[0])
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className='w-full flex items-center justify-center'>
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                        <label htmlFor="avatar" className=' w-full flex items-center justify-between'>
                                            <img src={photo} alt="add avatar" width={40} height={40} />
                                            <span className='font-semibold texts-dark text-sm'>Add Image avatar</span>
                                        </label>
                                    ) : (
                                        <label htmlFor="avatar" className='w-full flex items-center justify-between'>
                                            <span className='font-normal text-sm'>{values.picture.name}</span>
                                        </label>
                                    )}
                                </div>
                            )}
                        </Dropzone>

                        <div className="form-groups">
                            {
                                isLoading ? <button className='form-button' type='button'>Loading...</button> :
                                    <button className='form-button' type='submit'>Sign Up</button>
                            }

                        </div>

                        <div>
                            <p className='form-text text-[12px]'>Already have an account? <Link exact to="/" className="login__in-link">
                                Login
                            </Link></p>
                        </div>

                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Register