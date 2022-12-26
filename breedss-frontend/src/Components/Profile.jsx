import React, { Fragment, useState } from 'react'
import photo from '../Images/addAvatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/index';
import { MdPets } from 'react-icons/md';

import { BsPencilSquare } from "react-icons/bs";
import { Dialog, Transition } from '@headlessui/react'


const Profile = () => {

  const user = useSelector((state) => state.user)
  const posts = useSelector((state) => state.posts)
  const allUser = useSelector((state) => state.allUsers)

  const dispatch = useDispatch()
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI0ZmJhZjBmMjM0NjcxNTQyYTlkNSIsImlhdCI6MTY2OTQ5NjkwMn0.E2c7biL6A5-Rl6ms5WC8fK17QwHDVR-C3BA80XfL7PM'

  let userPosts = posts?.filter(post => {
    return post?.userId === user?._id
  })


  let [bioField, setBioField] = useState(false)
  let [bio, setBio] = useState(user?.bio)

  function closeModal() {
    setBioField(false)
  }
  const openBioField = () => {
    setBioField((prev) => !prev)

  }

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
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    }
    );
    const updatedUser = await response.json();
    console.log('aye oooo', updatedUser.updatedUser)

    dispatch(setUser({ user: updatedUser.updatedUser }))
    // dispatch(setFriends({ friends: updatedUser.userFriends.friends }))

    setBio('')
    closeModal()
  }

  

  return (


    <div className='profile-container hidden lg:block'>


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

                  <form className="form" onSubmit={handleUpdate}>

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
      {
        user.role === 'admin' ?
          <img
            src={photo}
            alt={user.picturePath}
            className='img'
          /> :

          <div className='edit-image hover:bg-red-500'>
            <img
              src={`${process.env.REACT_APP_IMG_URL}assets/${user.picturePath}`}
              alt={user.picturePath}
              className='img'
            />
            {/* <button
            onClick={handleImageEdit}
             className='cursor-pointer img z-50 ml-[50px] mt-[20px]' onClick={openBioField}><BsPencilSquare className='w-[20px]'/></button> */}

          </div>
      }



      <div className="user-info">
        <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
        <p className='user-info-p flex items-center gap-2 '>{user?.bio}
          <button className='cursor-pointer' onClick={openBioField}><BsPencilSquare /></button>
        </p>


        <div className="user-info-div">
          <div className="user-info-stat ">
            <h3>&nbsp;Posts &nbsp; </h3>
            {
              user.role === 'admin' ?
                <h4 className='user-info-h4 px-6'>{posts?.length}</h4>
                :
                <h4 className='user-info-h4 px-6'>{userPosts?.length}</h4>

            }
          </div>

          {
            user.role === 'admin' ?
              <div className="user-info-stat">
                <h3>Users</h3>
                <h4 className='user-info-h4'>{allUser?.length || 0}</h4>
              </div>
              :
              <div className="user-info-stat">
                <h3>Follow</h3>
                <h4 className='user-info-h4'>{user?.friends?.length || 0}</h4>
              </div>

          }



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
  )
}

export default Profile