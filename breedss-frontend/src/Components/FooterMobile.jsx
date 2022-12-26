import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltLeft, BiMessageSquareAdd, BiLogOutCircle, BiChevronsDown, BiBadgeCheck } from 'react-icons/bi';
import { MdPets } from 'react-icons/md';
import { FaTimes, FaSearch, FaUserCog, FaUserFriends } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux'
import { setLogout, openModal, setPosts } from '../store/index';
import { Dialog, Transition, Listbox } from '@headlessui/react'
import InputEmoji from 'react-input-emoji'
import Dropzone from 'react-dropzone'
import { Formik } from "formik";
import * as yup from "yup";
import AllUsers from './AllUsers';
import Profile from './Profile';
import { setUser } from '../store/index';
import { BsPencilSquare } from "react-icons/bs";
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



const FooterMobile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    const posts = useSelector((state) => state.posts)||[]
    const notify = useSelector((state) => state.notifications)
    const token = useSelector((state) => state.token)

    const [selected, setSelected] = useState(animals[0])
    const [searchFriends, setSearchFriends] = useState(false)
    let [bioField, setBioField] = useState(false)
    let [bio, setBio] = useState(user?.bio)
    let [notifications, setNotifications] = useState(false)
    let [isFriend, setIsFriend] = useState(false)
    let [isProfile, setIsProfile] = useState(false)
    let [textField, setTextField] = useState(false)



    const [friendy, setFriendy] = useState(user.friends)
    const [friendySearch, setFriendySearch] = useState(friendy)

    useEffect(() => {
        setFriendy(user.friends)
        setFriendySearch(user.friends)
    }, [user])


    const handleSearch = (e) => {
        let search = e.target.value.toLowerCase();
        setFriendySearch(
            friendy.filter((data) => {
                return data.fullName.toLowerCase().includes(search.toLowerCase())
            })
        )
    }



    const openBioField = () => {
        setBioField((prev) => !prev)
    }
    const openNotifications = () => {
        setNotifications((prev) => !prev)
    }

    const showFriend = () => {
        setIsFriend((prev) => !prev)
    }

    const openTextField = () => {
        setTextField((prev) => !prev)

    }
    const showProfile = () => {
        setIsProfile((prev) => !prev)
    }

    function closeModal() {
        setBioField(false)
        setNotifications(false)
        setIsFriend(false)
        setTextField(false)
        setIsProfile(false)
    }


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
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const posts = await response.json();
        dispatch(setPosts({ posts:posts.posts }))
        onSubmitProps.resetForm();


    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await handleSubmit(values, onSubmitProps);
    };

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






    const handleUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('bio', bio)
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object)
        const response = await fetch(
            process.env.REACT_APP_BASE_URL + `users/${user._id}`, {
            method: "put",
            body: json,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        );
        const updatedUser = await response.json();
        console.log(updatedUser.updatedUser.bio)

        dispatch(setUser({ user: updatedUser.updatedUser }))
        setBio('')
        closeModal()
    }

    let userPosts = posts?.filter(post => {
        return post?.userId === user?._id
    })


    return (

        <div className='lg:hidden flex w-full relative'>



            {/* profile pop up */}
            <Transition appear show={isProfile} as={Fragment}>
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
                            <div className="w-11/12 md:w-8/12 inline-block  max-w-md   text-left align-middle transition-all transform shadow-xl rounded-2xl">


                                <div className="bg-gray-100    rounded-lg">
                                    <div className='profile-container'>


                                        <Transition appear show={bioField} as={Fragment}>
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
                                                        <div className="w-full md:w-6/12 inline-block  max-w-md   text-left align-middle transition-all transform shadow-xl rounded-2xl">


                                                            <div className="bg-gray-100 p-2 p-6  rounded-lg">

                                                                <form className="form"
                                                                    onSubmit={handleUpdate}
                                                                >

                                                                    <textarea
                                                                        placeholder="Change Bio"
                                                                        className="w-full text-black md:text-base text-sm border border-gray-500 outline-none bg-transparent p-4 rounded-md"
                                                                        type="text"
                                                                        value={bio}
                                                                        onChange={(e) => setBio(e.target.value)}
                                                                        rows="6"


                                                                    />
                                                                    <div className="flex justify-end">
                                                                        <button type='submit' className='bg-dark text-white px-4 py-1 font-medium mt-4 rounded-md trxt-right'>Update</button>

                                                                    </div>

                                                                </form>


                                                            </div>




                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

                                        <div className="user-image">
                                        </div>
                                        <img src={`${process.env.REACT_APP_IMG_URL}assets/${user.picturePath}`} alt={user.picturePath} className='img' />


                                        <div className="user-info">
                                            <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                                            <p className='user-info-p flex items-center gap-2 '>{user?.bio}
                                                <button className='cursor-pointer' onClick={openBioField}><BsPencilSquare /></button>
                                            </p>


                                            <div className="user-info-div">
                                                <div className="user-info-stat">
                                                    <h3>My Posts</h3>
                                                    <h4 className='user-info-h4'>{userPosts?.length}</h4>
                                                </div>

                                                <div className="user-info-stat">
                                                    <h3>Friends</h3>
                                                    <h4 className='user-info-h4'>{user?.friends?.length || 0}</h4>
                                                </div>


                                            </div>
                                        </div>


                                        <hr />

                                        <div className="user-stats">



                                            <div className="user-stats-div">
                                                <p>Who's viewed your profile</p>
                                                <p>{user?.viewProfile}</p>
                                            </div>

                                            <div className="user-stats-div">
                                                <p>Impressions of your post</p>
                                                <p>{user?.impressions}</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>




                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            {/* Friends pop up */}
            <Transition appear show={isFriend} as={Fragment}>
                <Dialog
                    as="div"
                    className="w-full md:w-11/12  fixed flex justify-center items-center px-6 inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="w-full xl:w-7/12  lg:w-7/12 md:w-8/12 min-h-screen px-4 text-center">
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
                            <div className="w-11/12 md:w-8/12 inline-block  max-w-md   text-left align-middle transition-all transform shadow-xl rounded-2xl">


                                <div className="bg-gray-100    rounded-lg">
                                    <div className='friends-container '>
                                        <div className='search-friends'>
                                            <input type="text" name=""
                                                id="searchP" autoFocus
                                                className='search-friend-input'
                                                placeholder="Search Friends..."

                                            onChange={handleSearch}
                                            />
                                        </div>
                                        <h3 className='font-lg text-bold mb-2'>Friends List</h3>

                                        <div className="mobile-friends-box h-[240px] overflow-y-scroll">

                                            {friendySearch?.map((friend, i) => {
                                                return (

                                                    <Link to={'/friend/' + friend?.userId}>
                                                        <div key={i} className="friends-div">
                                                            <div className="image-box overflow-hidden flex justify-center items-center ">
                                                                <img className=' ' src={`${process.env.REACT_APP_IMG_URL}assets/${friend.picturePath}`} alt="" />
                                                            </div>

                                                            <div className="friend-info">
                                                                <h3 className='text-[14px] font-semibold'>{friend?.fullName}</h3>
                                                                <p className='text-[10px]'>{friend?.bio}</p>
                                                            </div>
                                                        </div>
                                                    </Link>


                                                )
                                            })

                                            }
                                        </div>



                                    </div>
                                </div>




                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


            {/* create post pop up */}
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


                                <div className="bg-gray-100 p-6   rounded-lg">
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

                                                                        Add Media
                                                                    </button>
                                                                ) : (



                                                                    <button
                                                                        type="button"

                                                                        className='rounded-3xl  text-center mt-4 py-3 px-8 text-white text-sm font-semibold bg-light'>

                                                                        {values.picture.name}
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


            {/* alert pop up */}
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
                            <div className="w-full md:w-8/12 inline-block  max-w-md   text-left align-middle transition-all transform shadow-xl rounded-2xl">

                                <div className="bg-gray-100 p-8  rounded-lg h-[350px] overflow-y-scroll">
                                    <h1 className='text-2xl texts-dark font-semibold'>Notifications</h1>

                                    {
                                        notify.slice(0, 7).map((data) => {
                                            if (user?._id !== data.senderId) {
                                                return (
                                                    <div key={data._id} className="mt-6">
                                                        <p className='font-medium flex gap-2 items-center'>
                                                            <IoNotificationsSharp className='texts-dark' />
                                                            {data?.description}
                                                        </p>
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

            <header className="z-50 bg-dark p-3 fixed bottom-0 w-full" id="header">

                <nav className="flex">


                    <div className="post__nav-profiles flex justify-between w-full px-6">

                        <button  onClick={showFriend} className="flex flex-col items-center justify-center  text-white text-2xl user__link">
                            <FaUserFriends />
                            <p className='text-[13px]'>Friends</p>
                        </button>

                        <button onClick={showProfile} className="flex flex-col items-center justify-center  text-white text-2xl user__link">
                            <FaUserCog />
                            <p className='text-[13px]'>Profile</p>

                        </button>
                        <Link  to="/" title='social page' className="flex flex-col items-center justify-center text-white text-2xl user__link">
                            <MdPets />
                            <p className='text-[13px]'>Social</p>

                        </Link>
                        <button onClick={openTextField} title='Create Post' type='button' className="flex flex-col items-center justify-center text-white text-2xl user__link">
                            <BiMessageSquareAdd />
                            <p className='text-[13px]'>Create</p>

                        </button>

                        <button onClick={openNotifications} type='button' className='flex flex-col items-center justify-center text-white text-2xl'>
                            <IoNotificationsSharp />
                            <p className='text-[13px]'>Alerts</p>

                        </button>


                    </div>

                    {
                        searchFriends === true &&
                        <div className="absolute top-16 rounded-sm left-40 h-[300px] w-[315px] bg-white">
                            <AllUsers />
                        </div>

                    }
                    {/* <div className="nav__menu" id="nav-menu"> */}

                    {/* <div className= {click ? 'show-menu' : 'nav__menu'} id="nav-menu">
            <ul className="nav__list">
                <li className="nav__items">
                    <NavLink  to="/home" onClick={openNav} className="nav__link">Homepage</NavLink>

                </li>
                <li className="nav__items">
                    <NavLink  to="/about-us" onClick={openNav} className="nav__link">
                        About Us
                    </NavLink>

                </li>
                
                <li className="nav__items">
                    <NavLink  to="/social" onClick={openNav} className="nav__link">
                        Pet Social
                    </NavLink>
                </li>
                <li className="nav__items">
                    <NavLink  to="/login" onClick={openNav} className="nav__link login__link">
                        Login
                    </NavLink>

                </li>
                <li className="nav__items">
                    <NavLink  to="/signup" onClick={openNav} className="nav__link signup__link">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
           
        </div> */}


                    {/* {click ? <FaTimes className='nav__tog' onClick={openNav}/> : <BiMenuAltLeft className='nav__toggle' onClick={openNav}/>} */}


                </nav>
            </header>
        </div>
    )
}

export default FooterMobile