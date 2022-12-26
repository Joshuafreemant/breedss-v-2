import React, { useEffect, memo, lazy, Suspense, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Advert, Profile, Friends, FooterMobile } from '../Components/index'
import PostSkeleton from '../Components/PostSkeleton';
import { setNotifications, setPosts } from '../store'


const Posts = lazy(() => import("../Components/Posts"));
const Social = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state?.user)
    const posts = useSelector((state) => state?.posts)
    const token = useSelector((state) => state?.token)


    const sortedPost = [...posts]


    const getPosts = async () => {
        const fetchPosts = await fetch(process.env.REACT_APP_BASE_URL + 'posts', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`
            }
        })
        const fetchedPost = await fetchPosts.json();

        dispatch(setPosts({
            posts: fetchedPost,
        }))

    }
    useEffect(() => {
        getPosts()
    }, [])
    const getNotifications = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `notifications/${user._id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const fetchedResponse = await response.json();

        dispatch(setNotifications({
            notifications: fetchedResponse,
        }))

    }
    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <div className='social-bg flex flex-col h-full'>
            <section className="social-home">
                <div>
                    <Profile />
                    <div className="h-24 w-full  rounded-md bg-white">
                        <Advert slot="8217530327568975" googleAdId="ca-pub-8217530327568975" />
                    </div>

                </div>

                {
                    !sortedPost.length ?
                        <div className='post-section pb-40 md:pb-0 md:mb-0'>
                            <PostSkeleton />
                            <PostSkeleton />
                            <PostSkeleton />

                        </div> :

                        <div className='post-section pb-40 md:pb-0 md:mb-0'>

                            {
                                sortedPost.reverse().map((post, i) => {
                                    return (
                                        <Suspense fallback={<div key={i}><PostSkeleton /></div>}>
                                            <Posts key={post._id} post={post} />
                                        </Suspense>


                                    )

                                })
                            }
                            <br className='md:hidden' />
                            <br className='md:hidden' />
                            <br className='md:hidden' />
                            <br className='md:hidden' />
                            <br className='md:hidden' />
                            <br className='md:hidden' />
                            <br className='md:hidden' />
                            {/* <br className='md:hidden' /> */}

                        </div>

                }

                <div>
                    <Friends />
                    <div className="h-24 w-full rounded-md bg-white adss">
                        <Advert 
                        slot="7806394673" 
                        googleAdId="ca-pub-7292810486004926" 
                        />

                    </div>

                </div>

            </section>
            <FooterMobile />

        </div>
    )
}

export default memo(Social)