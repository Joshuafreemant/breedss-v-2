import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltLeft, BiMessageSquareAdd, BiLogOutCircle, BiChevronsDown, BiBadgeCheck } from 'react-icons/bi';
import { MdPets } from 'react-icons/md';
import { IoNotificationsSharp } from 'react-icons/io5';

import { FaTimes, FaSearch, FaUserCog, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, openModal, setPosts } from '../store/index';
import { Dialog, Transition, Listbox } from '@headlessui/react'
import InputEmoji from 'react-input-emoji'
import Dropzone from 'react-dropzone'
import { Formik } from "formik";
import * as yup from "yup";
import AllUsers from './AllUsers';
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';

const postSchema = yup.object().shape({
    description: yup.string(),
    category: yup.string(),
    picture: yup.string()
});


const animals = [
    { name: 'Dogs' },
    { name: 'Bunnies' },
    { name: 'Cats' },
    { name: 'Birds' },
    { name: 'Others' },

]
const initialValuesPost = {
    description: "",
    picture: "",

};



const Navbar = () => {
    const token = useSelector((state) => state?.token)

    const [selected, setSelected] = useState(animals[0])
    const [searchFriends, setSearchFriends] = useState(false)


    const [friendy, setFriendy] = useState([])
    const [filteredFriend, setFilteredFriend] = useState(friendy)

    const getUsers = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `users`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const fetchedResponse = await response.json();

        setFriendy(fetchedResponse)
        setFilteredFriend(fetchedResponse)
    }

    useEffect(() => {
        getUsers()
    }, [])


    const navigate = useNavigate()
    const auth = useSelector((state) => state.token)
    const notify = useSelector((state) => state.notifications)

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);
        formData.append("category", selected.name);
        formData.append("userId", user._id);
        const response = await fetch(
            process.env.REACT_APP_BASE_URL + 'create',
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            }
        );
        setTextField(false)
        const posts = await response.json();
        dispatch(setPosts({ posts: posts.posts }))
        onSubmitProps.resetForm();

        setTextField(false)

    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await handleSubmit(values, onSubmitProps);
    };




    let [textField, setTextField] = useState(false)
    let [notifications, setNotifications] = useState(false)

    function closeModal() {
        setTextField(false)
        setNotifications(false)
    }
    const openTextField = () => {
        setTextField((prev) => !prev)

    }

    const openNotifications = () => {
        setNotifications((prev) => !prev)

    }

    const handleSearch = (e) => {
        setSearchFriends((prev) => !prev)


        let userF = friendy?.filter(u => {
            return u?.fullName.toLowerCase()?.includes(e.target.value.toLowerCase())
        })
        setFilteredFriend(userF)


    }

    const lastIndex = notify?.length - 1
    function buttonOnClick() {
        addNotification({
            title: notify[lastIndex]?.description || '',
            native: true
        })
    };

    useEffect(() => {
        buttonOnClick()

    }, [])

    return (

        <>



            <Transition appear show={textField} as={Fragment}>
                <Dialog
                    as="div"
                    className="w-full md:w-11/12  fixed flex justify-center items-center px-6 inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="w-full xl:w-7/12 lg:w-7/12 md:w-8/12 min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-[0.7]" />


                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="w-full md:w-8/12 inline-block  max-w-md   text-left align-middle transition-all transform shadow-xl rounded-2xl">


                                <div className="bg-gray-100 p-2 p-12  rounded-lg">
                                    <Formik
                                        onSubmit={handleFormSubmit}
                                        initialValues={initialValuesPost}
                                        validationSchema={postSchema}
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

                                                <textarea
                                                    placeholder="Create Post"
                                                    className="w-full text-black md:text-base text-sm border border-gray-500 outline-none bg-transparent p-4 rounded-md"
                                                    type="text"

                                                    rows="6"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.description}
                                                    name="description"
                                                    error={
                                                        Boolean(touched.description) && Boolean(errors.description)
                                                    }
                                                    helperText={touched.description && errors.description}

                                                />
                                                <div className="w-full z-50">
                                                    <Listbox value={selected} onChange={setSelected}>
                                                        <div className="relative mt-1">
                                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                                <span className="block truncate">{selected.name}</span>
                                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <BiChevronsDown
                                                                        className="h-5 w-5 text-gray-400"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Listbox.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                    {animals.map((animal, animalIdx) => (
                                                                        <Listbox.Option
                                                                            key={animalIdx}
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                                }`
                                                                            }
                                                                            value={animal}
                                                                        >
                                                                            {({ selected }) => (
                                                                                <>
                                                                                    <span
                                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                            }`}
                                                                                    >
                                                                                        {animal.name}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                            <BiBadgeCheck className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null}
                                                                                </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                    </Listbox>
                                                </div>

                                                <div className="flex justify-between">


                                                    <Dropzone
                                                        acceptedFiles=".jpg,.jpeg,.png, .mp4"
                                                        multiple={false}
                                                        onDrop={(acceptedFiles) =>
                                                            setFieldValue("picture", acceptedFiles[0])
                                                        }
                                                    >
                                                        {({ getRootProps, getInputProps }) => (
                                                            <div {...getRootProps()} className='w-full flex '>
                                                                <input {...getInputProps()} />
                                                                {!values.picture ? (
                                                                    <button
                                                                        // onClick={adminProofOfOwnerAction}
                                                                        type="button"

                                                                        className='rounded-3xl  text-center mt-4 py-3 px-8 text-white text-sm font-semibold bg-light'>

                                                                        Choose Media
                                                                    </button>
                                                                ) : (



                                                                    <button
                                                                        type="button"

                                                                        className=' rounded-3xl  text-center mt-4 py-3 px-8 text-white text-sm font-semibold bg-light'>
                                                                        <p className='w-16 truncate'>
                                                                            {values.picture.name}

                                                                        </p>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Dropzone>

                                                    {
                                                        values.description === '' ?
                                                            <button
                                                                type="button"

                                                                className='bg-light rounded-3xl  text-center mt-4 py-3 px-8 text-white text-sm font-semibold'>

                                                                Post</button> :
                                                            <button
                                                                type="submit"

                                                                className='bg-dark rounded-3xl  text-center mt-4 py-3 px-8 text-white text-sm font-semibold'>

                                                                Post</button>
                                                    }


                                                </div>

                                            </form>
                                        )}
                                    </Formik>

                                </div>




                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


            <Transition appear show={notifications} as={Fragment}>
                <Dialog
                    as="div"
                    className="w-full md:w-11/12  fixed flex justify-center items-center px-6 inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="w-full xl:w-7/12 lg:w-7/12 md:w-8/12 min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-[0.7]" />


                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="w-full lg:w-6/12  inline-block  max-w-md   text-left align-middle transition-all transform shadow-xl rounded-2xl">

                                <div className="bg-gray-100  rounded-lg h-[420px] md:w-[380px] overflow-y-scroll">
                                    <h1 className='text-2xl texts-dark font-semibold pt-8 px-6 '>Notifications</h1>

                                    {
                                        notify.slice(0, 9).map((data) => {
                                            if (user?._id !== data?.senderId) {
                                                return (
                                                    <div key={data._id} className=" mt-6">
                                                        <p className='px-4 mb-4 font-medium flex gap-2 items-center'>
                                                            <IoNotificationsSharp className='texts-dark' />
                                                            {data?.description}
                                                        </p>
                                                        <hr className='border-t border-gray-400' />
                                                    </div>

                                                )
                                            }
                                        })
                                    }

                                </div>




                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <header className="header" id="header">

                <nav className="nav container relative">
                    <div className='search-logo'>
                        <Link className="nav__logo text-sm" to="/home"><MdPets />
                            <span className=' md:flex hidden '>Breedss</span> </Link>


                        {
                            auth &&
                            <> <div className='show__search'>
                                <form action="" method="post">
                                    <input
                                        onChange={handleSearch}
                                        type="text"
                                        name=""
                                        className='outline-none'
                                        id="searchP"
                                        autoFocus
                                        placeholder="Search Pet Users"
                                    />
                                    {/* <button className='hidden lg:flex'> Search</button> */}
                                </form>
                            </div>

                                <button type='button' className='lg:hidden flex flex-col items-center justify-center text-white text-2xl' onClick={() => {
                                    dispatch(setLogout())
                                    navigate('/')

                                }}> <BiLogOutCircle />

                                </button>
                            </>
                        }




                    </div>

                    {
                        auth ? <>
                            <div className="post__nav-profile hidden lg:flex">
                                <button onClick={openNotifications} className="flex flex-col items-center justify-center text-white text-2xl user__link">
                                    <IoNotificationsSharp />
                                    <span className='text-xs'>Alerts</span>
                                </button>






                                <Link to="/" title='social page' className="flex flex-col items-center justify-center text-white text-2xl user__link">
                                    <MdPets />
                                    <span className='text-xs'>Social</span>

                                </Link>
                                <button onClick={openTextField} title='Create Post' type='button' className="flex flex-col items-center justify-center text-white text-2xl user__link">
                                    <BiMessageSquareAdd />
                                    <span className='text-xs'>Create</span>
                                </button>

                                <button type='button' className='flex flex-col items-center justify-center text-white text-2xl' onClick={() => {
                                    dispatch(setLogout())
                                    navigate('/')
                                }}> <BiLogOutCircle />
                                    <span className='text-xs'>Logout</span>

                                </button>


                            </div>

                            {
                                searchFriends === true &&
                                <div className="absolute top-16 rounded-sm  left-16 md:left-40 w-[290px] h-[300px] md:h-[300px] md:w-[315px] bg-white">
                                    <AllUsers data={filteredFriend} />
                                </div>

                            }
                        </> :

                            <div className='nav__menu ' id="nav-menu">
                                <ul className="nav__list flex  gap-4 text-white">




                                    <li className="nav__items">
                                        <Link to="/" className="font-normal flex justify-center items-center bg-white texts-dark px-3 py-1 rounded-md">
                                            Login
                                        </Link>

                                    </li>
                                    <Link to="/create-account" className="font-normal  flex justify-center items-center bg-white texts-dark px-3 py-1 rounded-md">
                                        Register
                                    </Link>
                                </ul>

                            </div>

                    }

                    {/* <div className="nav__menu" id="nav-menu"> */}




                    {/* {click ? <FaTimes className='nav__tog' onClick={openNav}/> : <BiMenuAltLeft className='nav__toggle' onClick={openNav}/>} */}


                </nav>
            </header>
        </>
    )
}

export default Navbar