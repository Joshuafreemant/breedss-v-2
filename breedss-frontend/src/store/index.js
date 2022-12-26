import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    posts: [],
    friendPosts: [],
    modal: false,
    allUsers:[],
    notifications:[]
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            // state.user = null;
            state.token = null;
            state.posts=[]
            state.allUsers=[]
            state.notifications=[]
        },

        setUser: (state, action) => {
            state.user = action.payload.user;
        },

        setAllUsers: (state, action) => {
            state.allUsers = action.payload.allUsers;
        },


        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error('friends non exist')
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post
                return post;
            });
            state.posts = updatedPosts;
        },
        setFriendPosts: (state, action) => {
            state.friendPosts = action.payload.friendPosts;
        },
        openModal: (state, action) => {
            state.modal = state.modal === false ? true : false;
        },
        setNotifications: (state, action) => {
            if (state.notifications) {
                state.notifications = action.payload.notifications
            } else {
                console.error('')
            }
        },

        // searchByName: (state, action) => {
           
        //     state.user.friends = action.payload.friends
        //     console.log(action.payload.friend)
            
        
        // },
    }
});

export const { setLogin, setLogout, setFriendPosts, setNotifications, setPosts, setFriends, setPost, openModal,searchByName,setUser,setAllUsers } = authSlice.actions;

export default authSlice.reducer;