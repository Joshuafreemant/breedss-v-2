import React, { useState, Fragment, useRef, useEffect } from 'react'
import DogImage from '../Images/dog.jpg'
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from "react-icons/fi";
import { CiShare1 } from "react-icons/ci";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'

import { RWebShare } from "react-web-share";
import InputEmoji from "react-input-emoji";

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setPost, setPosts, setFriends } from '../store';
import { Dialog, Transition, Listbox, Menu } from '@headlessui/react'
import Comments from './Comments';
import add from '../Images/add.png'

const Posts = ({ post }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const posts = useSelector((state) => state?.posts)
    const token = useSelector((state) => state?.token)


    const media = post?.picturePath;
    const splitMedia = media.split('.').pop();
    const ext = splitMedia.split('.').pop();

    const [show, setShow] = useState(false);
    const [like, unLike] = useState(false);
    const [comment, setComment] = useState('');

    function showMore() {
        setShow((show) => !show)

    }
    function likes() {
        unLike((like) => !like)

    }

    const isLiked = Boolean(post.likes[user._id])
    const likeCount = Object.keys(post.likes).length


    const handleDelete = async () => {
        const response = await fetch(
            process.env.REACT_APP_BASE_URL + `posts/${post._id}/delete`,
            {
                method: "delete",
                headers: {

                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const updatedPost = await response.json();

        dispatch(setPosts({ posts: updatedPost }))
    }


    const handleLike = async () => {

        let formData = new FormData()
        formData.append('userId', user._id)
        formData.append('reciever', post.userId)
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object)
        const response = await fetch(
            process.env.REACT_APP_BASE_URL + `posts/${post._id}/like`,
            {
                method: "PATCH",
                body: json,
                headers: {

                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const updatedPost = await response.json();

        dispatch(setPost({ post: updatedPost }))
    }


    const handleComment = async (e) => {
        e.preventDefault()
        if (comment !== '') {
            const formData = new FormData()
            formData.append('reciever', post.userId)
            formData.append('fullName', user.fullName)
            formData.append('userId', user._id)
            formData.append('comments', comment)
            let object = {};
            formData.forEach((value, key) => object[key] = value);
            let json = JSON.stringify(object)
            const response = await fetch(
                process.env.REACT_APP_BASE_URL + `posts/${post._id}/comment`,
                {
                    method: "post",
                    body: json,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setComment('')

            const updatedPost = await response.json();

            dispatch(setPosts({ posts: updatedPost }))
        } else {
            alert('youre a fool')
        }

    }

    //modal activities
    let [commentField, setCommentField] = useState(false)
    let [deleteModal, setDeleteModal] = useState(false)


    function closeModal() {
        setCommentField(false)
        setDeleteModal(false)
    }
    const openCommentField = () => {
        setCommentField((prev) => !prev)

    }

    const openDelete = () => {
        setDeleteModal((prev) => !prev)

    }
    //end modal activities

    const addFriend = async (e) => {
        e.preventDefault()
        const response = await fetch(
            process.env.REACT_APP_BASE_URL + `users/${user._id}/${post.userId}`, {
            method: "put",
            // body:json,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        );
        setComment('')
        const updatedUser = await response.json();
        dispatch(setFriends({ friends: updatedUser.userFriends.friends }))

    }

    // check maybe the friend is already added as part of the users friend


    let userF = []
// user?.friends?.filter(u => {
//     return u?.userId?.includes(post?.userId)
// })

    return (
        <div >

            {/* pop up for confirmation of delete */}
            <Transition appear show={deleteModal} as={Fragment}>
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
                            <div className="w-full md:w-6/12 mt-20 bg-white p-8 h-[300px] rounded overflow-hidden inline-block relative  max-w-md   text-left align-middle transition-all transform shadow-xl ">
                                <h3 className='mt-6 font-bold text-xl text-center'>Confirm Delete</h3>
                                <p className='text-center mt-6'>Are you sure you want to delete this post?</p>
                                <div className="flex justify-between mt-8 gap-4">
                                    <button onClick={closeModal} className='w-full p-3 font-semibold bg-light text-white  rounded-3xl'>Cancel</button>
                                    <button onClick={handleDelete} className='w-full p-3 font-semibold bg-dark text-white  rounded-3xl'>Delete</button>

                                </div>


                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            {/* pop up modal for commenting */}
            <Transition appear show={commentField} as={Fragment}>
                <Dialog
                    as="div"
                    className="w-full md:w-11/12  fixed flex justify-center items-center  inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="w-full xl:w-7/12 lg:w-7/12 md:w-8/12 min-h-screen  text-center">
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
                            <div className="w-full md:w-8/12 mt-20 overflow-hidden inline-block relative  max-w-md   text-left align-middle transition-all transform shadow-xl ">

                                <div className="bg-gray-100 p-2 p-6     h-[500px]  overflow-y-scroll mb-12">

                                    <button onClick={closeModal} className='text-white fixed right-6 top-4 bg-dark p-1'><IoCloseOutline /></button>

                                    <Comments comments={post.comments} />





                                </div>

                                <div className="w-full fixed bottom-0 p-3 flex justify-between items-center  bg-dark ">
                                    {/* <input
                                        type="text"
                                        className="w-[340px] p-2 outline-none border border-gray-600 rounded-3xl"
                                        placeholder="Add a Comment"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}

                                    /> */}
                                    <InputEmoji
                                        theme='light'
                                        value={comment}
                                        onChange={setComment}
                                        cleanOnEnter
                                        // onEnter={handleOnEnter}
                                        placeholder="Type a message"
                                    />
                                    {
                                        comment === '' ?
                                            <label type='button' className='h-[33px] cursor-not-allowed px-3 py-[5px] text-[14px] rounded-xl bg-light text-white'>Post</label> :
                                            <button className='post-button h-[33px] bg-white px-3 py-[5px] text-[14px] rounded-xl' type='submit' onClick={handleComment}>Post</button>

                                    }

                                </div>


                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>



            <section className="post">

                <div className="post__container container">
                    <div className="post__header">
                        <div className="post__user">
                            <div className="user__picture overflow-hidden ">
                                <img className='rounded-full w-[30px] h-[30px]' src={`${process.env.REACT_APP_IMG_URL}assets/${post.userPicturePath}`} />

                            </div>
                            <Link to={'/friend/' + post?.userId}>
                                <h4 className='font-semibold'>{post.fullName}</h4></Link>
                        </div>
                        <div className="post__option relative">




                            <div className="absolute top-0 right-3 w-44 text-right">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="font-bold text-lg tracking-widest inline-flex w-full justify-center rounded-md  bg-opacity-20  text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            ...

                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item>
                                                    {({ active }) => (


                                                        <RWebShare
                                                            data={{
                                                                text: "Like humans, flamingos make friends for life",
                                                                url: `http://localhost:3000/friend/${post.userId}`,
                                                                title: "Breedss socials",
                                                            }}

                                                        >
                                                            <button
                                                                className={`${active ? 'cursor-pointer  text-white' : 'text-gray-900'
                                                                    } group flex gap-4 w-full  font-semibold items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <CiShare1 />
                                                                Share Post
                                                            </button>
                                                        </RWebShare>

                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (


                                                        user._id === post.userId ?



                                                            <button onClick={openDelete}
                                                                className={`${active ? 'bg-dark text-white' : 'text-gray-900'
                                                                    } group gap-4 flex w-full font-semibold items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <AiOutlineDelete />
                                                                Delete Post
                                                            </button> :

                                                            (
                                                                user.friends.filter(fri => (fri.userId === post.userId)).length ?
                                                                    <button onClick={addFriend}
                                                                        className={`${active ? 'bg-dark text-white' : 'text-gray-900'
                                                                            } group gap-4 flex w-full font-medium items-center rounded-md px-2 py-2 text-sm`}
                                                                    >
                                                                        <AiOutlineUserAdd />
                                                                        Remove Friend
                                                                    </button> :
                                                                    <button onClick={addFriend}
                                                                        className={`${active ? 'bg-dark text-white' : 'text-gray-900'
                                                                            } group gap-4 flex w-full font-medium items-center rounded-md px-2 py-2 text-sm`}
                                                                    >
                                                                        <AiOutlineUserAdd />
                                                                        Add Friend
                                                                    </button>

                                                            )


                                                    )}
                                                </Menu.Item>

                                                {user.role === 'admin' &&
                                                    <Menu.Item>
                                                        {({ active }) => (



                                                            <button onClick={openDelete}
                                                                className={`${active ? 'bg-dark text-white' : 'text-gray-900'
                                                                    } group gap-4 flex w-full font-semibold items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <AiOutlineDelete />
                                                                Delete Post
                                                            </button>

                                                        )}
                                                    </Menu.Item>
                                                }
                                            </div>

                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                        </div>
                    </div>


                    <div className="post__content">
                        <p className="post__time">
                            {moment(post.createdAt).startOf('hour').fromNow()}</p>


                        <p className="post__description">
                            {post.description}
                            <br className='mb-3' />
                            <a className='bg-dark text-white rounded px-[7px] py-[2px] text-xs'> {post.category}</a>
                        </p>






                        {ext === 'mp4' ? <video controls className="post__image">
                            <source src={`${process.env.REACT_APP_IMG_URL}assets/${post.picturePath}`} type="video/mp4" />
                        </video> : <img src={`${process.env.REACT_APP_IMG_URL}assets/${post.picturePath}`} alt="" className="post__image" />}




                    </div>

                    <div className="post__actions">

                        {
                            post.comments.slice(0, 5).map((comment) => {
                                return (
                                    <div key={comment._id} className="post__comments flex items-start   justify-start">
                                        <h5 className='truncate'>{comment.userId}: </h5>
                                        <p className={show ? '' : 'post__comments-p w-8/12 truncate'}> {comment.comment}</p>
                                    </div>
                                )
                            })
                        }


                        {/* <div className="post__comments">

                            <h5>Dane.kate: </h5>&nbsp;<p className={show ? '' : 'post__comments-p'}> This cat is super cool and I Love this mhenn</p>
                            <button className={show ? 'hide__more' : 'show__more'} onClick={showMore}>More</button>
                        </div> */}
                        {
                            post.comments.length === 0 ?
                                <p className="all__comment cursor-pointer">0 comment</p>
                                :
                                <p className="all__comment cursor-pointer" onClick={openCommentField}>View all {post.comments.length} comments</p>

                        }
                        <div className="post__action-like">
                            <span className=' font-semibold texts-dark'>{likeCount}</span>
                            <div className="post__action-left" onClick={likes}>

                                {like ?
                                    <button className='text-xl texts-dark' onClick={handleLike}>
                                        <FaHeart /></button> :

                                    <button className='texts-dark animate-bounce transition ease-in-out delay-150 text-xl' onClick={handleLike}><FiHeart /></button>}



                            </div>

                            <form className='w-full'>
                                <div className="post__action-right">
                                    {/* <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Add a Comment"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}

                                    /> */}
                                    <InputEmoji
                                        theme='light'
                                        value={comment}
                                        onChange={setComment}
                                        cleanOnEnter
                                        // onEnter={handleOnEnter}
                                        placeholder="Type a message"
                                    />

                                    {
                                        comment === '' ?
                                            <label type='button' className='cursor-not-allowed px-3 py-[5px] text-[14px] rounded-xl bg-light text-white'>Post</label> :
                                            <button className='post-button' type='submit' onClick={handleComment}>Post</button>

                                    }

                                </div>
                            </form>
                        </div>



                    </div>
                </div>

            </section>
        </div>
    )
}

export default Posts