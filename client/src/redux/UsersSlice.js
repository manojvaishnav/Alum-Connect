
import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { token } from '../utils/GlobalFunctions';

const url = process.env.REACT_APP_URL;
const userRoutes = 'api/v1/user';

const UsersSlice = createSlice({
    name : 'users',
    initialState : {
        loading : false,
        user : {},
        posts : [],
        alumnis : [],
        msg : ""
    },
    reducers : {

        //------- Register the users-------------
        UserRegisterRequest(state){
            state.loading = true
        },

        UserRegister(state,action){
            state.loading = false
            state.user = action.payload.user;
            state.msg = action.payload.msg
        },

        UserRegisterError(state,action){
            state.loading = false;
            state.user = {}
            state.msg = action.payload
        },

        //---------------- Login the users
        UserLoginRequest(state){
            state.loading = true
        },

        UserLogin(state,action){
            state.loading = false
            state.user = action.payload.user;
            state.msg = action.payload.msg
        },

        UserLoginError(state,action){
            state.loading = false;
            state.user = {}
            state.msg = action.payload
        },

        //---------------- Get profile of loogged users
        UserProfileRequest(state){
            state.loading = true
        },

        UserProfile(state,action){
            state.loading = false
            state.user = action.payload.user;
            state.msg = action.payload.msg
        },

        UserProfileError(state,action){
            state.loading = false;
            state.user = {}
            state.msg = action.payload
        },

        //------------ Fetching the clg posts
        UserFetchClgAllPostsRequest(state){
            state.loading = true
        },

        UserFetchClgAllPosts(state,action){
            state.loading = false
            state.posts = action.payload.posts;
            state.msg = action.payload.msg
        },

        UserFetchClgAllPostsError(state,action){
            state.loading = false;
            state.posts = []
            state.msg = action.payload
        },

        //------------ Fetching the clg posts
        UserFetchClgAllAlumnisRequest(state){
            state.loading = true
        },

        UserFetchClgAllAlumnis(state,action){
            state.loading = false
            state.alumnis = action.payload.alumnis;
            state.msg = action.payload.msg
        },

        UserFetchClgAllAlumnisError(state,action){
            state.loading = false;
            state.alumnis = []
            state.msg = action.payload
        },

        UserLogout(state){
            state.user = {};
            state.posts = [];
            state.alumnis = [];
            state.loading = false;
            state.msg = ""
        },

        //------------ Clear all the error
        ClearUsersSlice(state){
            state.loading = false;
            state.msg = ""
        }
    }
});

export const {UserRegister,UserRegisterError,UserRegisterRequest,ClearUsersSlice,UserLogin,UserLoginError,UserLoginRequest, UserProfile,UserProfileError,UserProfileRequest ,UserFetchClgAllPosts, UserFetchClgAllPostsError,UserFetchClgAllPostsRequest, UserFetchClgAllAlumnis, UserFetchClgAllAlumnisError, UserFetchClgAllAlumnisRequest, UserLogout} = UsersSlice.actions

export default UsersSlice.reducer;


//--------------- Creating the redux thunk middlewares
export const RegisterUser = (form) => async dispatch =>{
    dispatch(UserRegisterRequest())
    try {

        const res = await fetch(`${url}/${userRoutes}/register`,{
            method : 'POST',
            headers : {
                'Content-Type' : "application/json",
            },
            body:JSON.stringify(form)
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(UserRegisterError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //Set token on localStorage
        const token = data?.token;
        localStorage.setItem('token',token);
        

        //------- Set the users
        const msg = data?.msg;
        const user = data?.user;

        dispatch(UserRegister({user,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(UserRegisterError(error));
    }
}

//--------------- Creating the redux thunk middlewares
export const LoginUser = (form) => async dispatch =>{
    dispatch(UserLoginRequest())
    try {

        const res = await fetch(`${url}/${userRoutes}/login`,{
            method : 'POST',
            headers : {
                'Content-Type' : "application/json",
            },
            body:JSON.stringify(form)
        });

        const data = await res.json();

        console.log('data' ,data);


        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(UserLoginError(data.msg));
            return
        }


        toast.success(data?.msg)

        //Set token on localStorage
        const token = data?.token;
        localStorage.setItem('token',token);
        

        //------- Set the users
        const msg = data?.msg;
        const user = data?.user;

        dispatch(UserLogin({user,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(UserLoginError(error));
    }
}


//--------------- Get the profile of logged users
export const Profile = () => async dispatch =>{
    dispatch(UserProfileRequest())
    try {

        const res = await fetch(`${url}/${userRoutes}/profile`,{
            method : 'GET',
            headers : {
                'Content-Type' : "application/json",
                'auth-token' : token
            }
        });

        const data = await res.json();

        console.log('data' ,data);


        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(UserProfileError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const user = data?.user;

        dispatch(UserProfile({user,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(UserProfileError(error));
    }
}

//--------------- Get the profile of logged users
export const FetchAllClgPosts = () => async dispatch =>{
    dispatch(UserFetchClgAllPostsRequest())
    try {

        const res = await fetch(`${url}/${userRoutes}/fetch-clg-all-posts`,{
            method : 'GET',
            headers : {
                'Content-Type' : "application/json",
                'auth-token' : token
            }
        });

        const data = await res.json();

        console.log('data' ,data);


        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(UserFetchClgAllPostsError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const posts = data?.posts;

        dispatch(UserFetchClgAllPosts({posts,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(UserFetchClgAllPostsError(error));
    }
}



export const FetchAllClgAlumnis = () => async dispatch =>{
    dispatch(UserFetchClgAllAlumnisRequest())
    try {

        const res = await fetch(`${url}/${userRoutes}/fetch-clg-alumnis`,{
            method : 'GET',
            headers : {
                'Content-Type' : "application/json",
                'auth-token' : token
            }
        });

        const data = await res.json();

        console.log('data' ,data);


        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(UserFetchClgAllAlumnisError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const alumnis = data?.alumnis;

        dispatch(UserFetchClgAllAlumnis({alumnis,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(UserFetchClgAllAlumnisError(error));
    }
}

export const LogoutUser = ()=> async dispatch =>{
    
    localStorage.removeItem('token');
    dispatch(UserLogout());
}