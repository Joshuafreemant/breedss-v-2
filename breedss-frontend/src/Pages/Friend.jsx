import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { setUser,setFriendPosts } from '../store';
import { useDispatch, useSelector } from 'react-redux'
import Social from './Social';
import { Advert, Friends, Posts, Profile, FriendProfile, FooterMobile } from '../Components';
import FullAds from '../Components/FullAds';

const Friend = () => {

    const dispatch = useDispatch()

    let dat
    const token = useSelector((state) => state.token)
    const userPosts = useSelector((state) => state.friendPosts)||[]
    const { id } = useParams()

    
    let [friendData, setFriendData] = useState('')
    let [friendPost, setFriendPost] = useState([])
    const getUser = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `users/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        dat = await response.json();
        setFriendData(dat)


    }

    const getUserPosts = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `posts/${id}/posts`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        let postData = await response.json();
        setFriendPost(postData)
// console.log('postData',postData)
        
        dispatch(setFriendPosts({
            friendPosts: postData,
        }))
    }



    useEffect(() => {
        getUser()
        getUserPosts()
    }, [id])

    return (
        <div className='social-bg'>
            <section className="social-home">
                <div className='mb-12'>
                    <FriendProfile data={friendData?.user} post={friendPost} />

                    <div className="hidden md:block">
                        <Advert />

                    </div>

                </div>

                <div className='post-section'>

                    {
                        userPosts.map((post, i) => {
                            return (
                                <Posts key={post._id} post={post} />

                            )
                        })
                    }


                </div>

                <div className='hidden md:block bg-white rounded-md'>
                    {/* <Friends /> */}
                    <Advert slot="8217530327568975" googleAdId="ca-pub-8217530327568975" />

                </div>

            </section>
            <FooterMobile />


        </div>
    )
}

export default Friend