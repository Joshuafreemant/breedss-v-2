import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, searchByName } from '../store/index';
import { Link, useNavigate } from "react-router-dom";

const AllUsers = ({ data }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [filteredFriend, setFilteredFriend] = useState(data)




    return (
        <div className='friends-container'>

            <div className="friends-box">
                <h3 className='font-lg text-bold mb-2'>Search All Users</h3>

                <hr />
                <div className='mt-3 h-[290px] overflow-y-scroll'>
                    {data?.map((users, i) => {


                        if (users.role.includes('member')) {
                            return (

                                <Link to={'/friend/' + users?._id}>

                                    <div key={i} className="friends-div">
                                        <div className="image-box overflow-hidden flex justify-center items-center ">
                                            <img className=' ' src={`${process.env.REACT_APP_IMG_URL}assets/${users.picturePath}`} alt="" />
                                        </div>

                                        <div className="friend-info">
                                            <h3 className='text-[14px] truncate font-semibold'>{users?.fullName}</h3>
                                            <p className='text-[10px] truncate'>{users?.bio}</p>
                                        </div>
                                    </div>
                                </Link>


                            )
                        }




                    })

                    }
                </div>
            </div>



        </div>
    )
}

export default AllUsers