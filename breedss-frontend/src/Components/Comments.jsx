import React from 'react'
import photo from '../Images/addAvatar.png'
const Comments = ({ comments }) => {
    console.log(comments, 'bbaghgas')
    return (
        <div className='mt-8'>
            {comments.map((data) => {
                return (
                    <div className='flex justify-start gap-3 mb-6'>
                        <div className=" rounded-full bg-green-500  w-[35px] h-[35px] overflow-hidden">
                            <img src={photo} alt="" />
                        </div>
                        <div className="w-10/12">
                            <h5 className='font-medium text-sm'>{data.userId} </h5>
                            <div className="bg-gray-200 rounded-lg text-black p-4">
                                <p className='text-sm'> {data.comment}</p>

                            </div>
                        </div>
                    </div>

                )
            })
            }
        </div>
    )
}

export default Comments