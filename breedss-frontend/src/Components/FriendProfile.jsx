import React, { Fragment, useState } from 'react'
import photo from '../Images/addAvatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { setAllUsers, setUser } from '../store/index';

import { BsPencilSquare } from "react-icons/bs";
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

//data from friend page
const FriendProfile = ({ data, post }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  console.log(post, 'gghghgg')

  let navigate = useNavigate()



  let [isDelete, setIsDelete] = useState(false)

  function closeModal() {
    setIsDelete(false)

  }


  const deleteUserModal = () => {
    setIsDelete((prev) => !prev)
  }

  const deleteUser = async () => {
    
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + `users/${data._id}/delete`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const updatedUser = await response.json();

    if (updatedUser) {
      dispatch(setAllUsers({ allUsers: updatedUser.users }))
      navigate('/')

    }

  }




  return (


    <div className='profile-container'>
      {/* pop up for confirmation of delete */}
      <Transition appear show={isDelete} as={Fragment}>
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
                <p className='text-center mt-6'>Are you sure you want to delete this user?</p>
                <div className="flex justify-between mt-8 gap-4">
                  <button onClick={closeModal} className='w-full p-3 font-semibold bg-light text-white  rounded-3xl'>Cancel</button>
                  <button onClick={deleteUser} className='w-full p-3 font-semibold bg-dark text-white  rounded-3xl'>Delete</button>

                </div>


              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>



      <div className="user-image">
      </div>
      <img src={`${process.env.REACT_APP_IMG_URL}assets/${data?.picturePath}`} alt={data?.picturePath} className='img' />


      <div className="user-info">
        <h3 className='text-lg font-semibold'>{data?.fullName}</h3>
        <p className='user-info-p flex items-center gap-2 '>{data?.bio}
          {

            user.role === 'admin' && <button onClick={deleteUserModal} className='text-lg'><AiOutlineDelete /></button>
          }

        </p>




        <div className="user-info-div">
          <div className="user-info-stat">
            <h3>Posts &nbsp;</h3>
            <h4 className='user-info-h4'>{post.length}</h4>
          </div>

          <div className="user-info-stat">
            <h3>Follow</h3>
            <h4 className='user-info-h4'>{data?.friends?.length || 0}</h4>
          </div>


        </div>
      </div>


      <hr />

      <div className="user-stats">



        <div className="user-stats-div">
          <p>Who's viewed your profile</p>
          <p>{data?.viewProfile}</p>
        </div>

        <div className="user-stats-div">
          <p>Impressions of your post</p>
          <p>{data?.impressions}</p>
<br className='md:hidden'/>

        </div>

      </div>

    </div>
  )
}

export default FriendProfile