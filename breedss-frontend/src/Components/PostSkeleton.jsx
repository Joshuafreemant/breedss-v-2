import React, { useState, Fragment, useRef, useEffect } from 'react'

const PostSkeleton = () => {

    return (
        <div>
            <section className="post">
                <div className="post__container container">
                    <div className="post__header">
                        <div className="post__user flex">
                            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                                {/* <img src={`${process.env.REACT_APP_IMG_URL}assets/${post.userPicturePath}`} /> */}
                                <div className="w-[50px] h-[50px] bg-gray-100 rounded"></div>
                            </div>
                            <p className="ml-2 bg-gray-100  w-6/12 h-[10px] rounded-xl">

                            </p>
                        </div>
                        <div className="font-bold text-lg tracking-widest post__option relative">



                            ...

                        </div>
                    </div>


                    <div className="post__content">


                        <p className=" bg-gray-100 mt-2 w-8/12 h-[10px] rounded-xl">

                        </p>

                        <p className=" bg-gray-100 mt-2 w-9/12 h-[10px] rounded-xl">

                        </p>


                        <p className=" bg-gray-100 mt-2 w-10/12 h-[10px] rounded-xl">

                        </p>


                        <p className=" bg-gray-100 mt-2 w-full h-[10px] rounded-xl">

                        </p>


                        <div className="bg-gray-100 w-full mt-8 h-[100px]"></div>






                    </div>

                    <div className="post__actions">




                        {/* <div className="post__comments">

                            <h5>Dane.kate: </h5>&nbsp;<p className={show ? '' : 'post__comments-p'}> This cat is super cool and I Love this mhenn</p>
                            <button className={show ? 'hide__more' : 'show__more'} onClick={showMore}>More</button>
                        </div> */}




                    </div>



                </div>
            </section >

        </div>


    )
}

export default PostSkeleton