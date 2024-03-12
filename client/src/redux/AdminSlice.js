import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {token} from '../utils/GlobalFunctions'

const url = process.env.REACT_APP_URL;
const adminRoutes = 'api/v1/admin';
const userRoutes = 'api/v1/user';


const AdminSlice = createSlice({
    name : 'admin',
    initialState : {
        loading:false,
        msg : '',
        admin : {},
        posts : [],
        alumnis : [],
        students : [],
        verifiedclgs : [],
        clgs : []
    },
    reducers : {
        AdminLoginRequest(state){
            state.loading = true;
        },

        AdminLogin(state,action){
            state.loading = false;
            state.admin = action.payload.user;
            state.msg = action.payload.msg;
        },

        AdminLoginError(state,action){
            state.loading = false;
            state.admin = {};
            state.msg = action.payload;
        },

        //----------- Clg Specific Stuff
        AdminVerifiedClgRequest(state){
            state.loading = true;
        },

        AdminVerifiedClg(state,action){
            state.loading = false;
            state.verifiedclgs = action.payload.clgs;
            state.msg = action.payload.msg;
        },

        AdminVerifiedClgError(state,action){
            state.loading = false;
            state.verifiedclgs = [];
            state.msg = action.payload;
        },

        //------------ Fetch all un verified clgs
        AdminUnverifiedClgRequest(state){
            state.loading = true;
        },

        AdminUnverifiedClg(state,action){
            state.loading = false;
            state.clgs = action.payload.clgs;
            state.msg = action.payload.msg;
        },

        AdminUnverifiedClgError(state,action){
            state.loading = false;
            state.clgs = [];
            state.msg = action.payload;
        },

        //--------------- Verified the clgs
        AdminVerifyClgRequest(state){
            state.loading = true;
        },

        AdminVerifyClg(state,action){
            state.loading = false;
            state.verifiedclgs.push(state.clgs.filter(item => item._id === action.payload._id ));
            state.clgs = state.clgs.filter(item => item._id !== action.payload._id);
            state.msg = action.payload.msg;
        },

        AdminVerifyClgError(state,action){
            state.loading = false;
            state.msg = action.payload;
        },

        //---------- Unverified the clgs
        AdminDeleteClgRequest(state){
            state.loading = true;
        },

        AdminDeleteClg(state,action){
            state.loading = false;
            state.clgs = state.clgs.filter(item => item._id !== action.payload._id);
            state.msg = action.payload.msg;
        },

        AdminDeleteClgError(state,action){
            state.loading = false;
            state.msg = action.payload;
        },

        //--------- Getting verified alumni list
        AdminVerifiedAlumniRequest(state){
            state.loading = true;
        },

        AdminVerifiedAlumni(state,action){
            state.loading = false;
            state.alumnis = action.payload.alumnis;
            state.msg = action.payload.msg;
        },

        AdminVerifiedAlumniError(state,action){
            state.loading = false;
            state.alumnis = [];
            state.msg = action.payload;
        },

        //------------ Get verified students list
        AdminVerifiedStudRequest(state){
            state.loading = true;
        },

        AdminVerifiedStud(state,action){
            state.loading = false;
            state.students = action.payload.students;
            state.msg = action.payload.msg;
        },

        AdminVerifiedStudError(state,action){
            state.loading = false;
            state.students = [];
            state.msg = action.payload;
        },

        //------------- Delete the users
        AdminDeleteStudRequest(state){
            state.loading = true;
        },

        AdminDeleteStud(state,action){
            state.loading = false;
            state.students = state.students.filter(item => item._id !== action.payload._id);
            state.alumnis = state.alumnis.filter(item => item._id !== action.payload._id);
            state.msg = action.payload.msg;
        },

        AdminDeleteStudError(state,action){
            state.loading = false;
            state.msg = action.payload;
        },

        //------ Get all posts
        AdminPostsRequest(state){
            state.loading = true;
        },

        AdminPosts(state,action){
            state.loading = false;
            state.posts = action.payload.posts;
            state.msg = action.payload.msg;
        },

        AdminPostsError(state,action){
            state.loading = false;
            state.posts = [];
            state.msg = action.payload;
        },

        AdminLogout(state){
            state.loading = false;
            state.msg = "";
            state.admin = {};
            state.verifiedclgs = [];
            state.clgs = []
            state.posts = []
            state.alumnis = []
            state.students = []
        },

        ClearAdminSlice(state){
            state.loading = false;
            state.msg = ""
        }
        
    }
})

export const {AdminLogin,AdminLoginError,AdminLoginRequest,ClearAdminSlice,AdminVerifiedClg,AdminVerifiedClgError,AdminVerifiedClgRequest, AdminLogout,AdminUnverifiedClg,AdminUnverifiedClgError,AdminUnverifiedClgRequest,AdminVerifiedAlumni,AdminVerifiedAlumniError,AdminVerifiedAlumniRequest, AdminVerifiedStud,AdminVerifiedStudError,AdminVerifiedStudRequest,AdminPosts,AdminPostsError,AdminPostsRequest,AdminDeleteStud,AdminDeleteStudError,AdminDeleteStudRequest,AdminDeleteClg,AdminDeleteClgError,AdminDeleteClgRequest,AdminVerifyClg,AdminVerifyClgError,AdminVerifyClgRequest} = AdminSlice.actions;
export default AdminSlice.reducer;

//----------------- Start to creating the middlewares Thunks

export const LoginAdmin = (form) => async dispatch =>{
    dispatch(AdminLoginRequest())
    try {

        const res = await fetch(`${url}/${userRoutes}/login`,{
            method : 'POST',
            headers : {
                'Content-Type' : "application/json",
            },
            body:JSON.stringify(form)
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminLoginError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //Set token on localStorage
        let token = data?.token;
        localStorage.setItem('token',token);
        

        //------- Set the users
        const msg = data?.msg;
        const user = data?.user;

        dispatch(AdminLogin({user,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminLoginError(error));
    }
}

export const GetVerifiedCollegeList = () => async dispatch =>{
    dispatch(AdminVerifiedClgRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/fetch-verify-clg-list`,{
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminVerifiedClgError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;
        const clgs = data?.colleges;

        dispatch(AdminVerifiedClg({clgs,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminVerifiedClgError(error));
    }
}

export const GetUnverifiedCollegeList = () => async dispatch =>{
    dispatch(AdminUnverifiedClgRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/fetch-unverify-clg-list`,{
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminUnverifiedClgError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;
        const clgs = data?.colleges;

        dispatch(AdminUnverifiedClg({clgs,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminUnverifiedClgError(error));
    }
}


export const VerfiyUnverifiedCollege = (_id) => async dispatch =>{
    dispatch(AdminVerifyClgRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/verify-clg/${_id}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminVerifyClgError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;

        dispatch(AdminVerifyClg({_id,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminVerifyClgError(error));
    }
}

export const DeleteCollege = (_id) => async dispatch =>{
    dispatch(AdminDeleteClgRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/delete-clg/${_id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminDeleteClgError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;

        dispatch(AdminDeleteClg({_id,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminDeleteClgError(error));
    }
}



export const GetVerifiedAlumniList = () => async dispatch =>{
    dispatch(AdminVerifiedAlumniRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/fetch-verify-alumni-list`,{
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminVerifiedAlumniError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;
        const alumnis = data?.alumnis;

        dispatch(AdminVerifiedAlumni({alumnis,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminVerifiedAlumniError(error));
    }
}

export const GetVerifiedStudentList = () => async dispatch =>{
    dispatch(AdminVerifiedStudRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/fetch-verify-student-list`,{
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminVerifiedStudError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;
        const students = data?.students;

        dispatch(AdminVerifiedStud({students,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminVerifiedStudError(error));
    }
}

export const DeleteUser = (_id) => async dispatch =>{
    dispatch(AdminDeleteStudRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/delete-user/${_id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminDeleteStudError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;

        dispatch(AdminDeleteStud({_id,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminDeleteStud(error));
    }
}

export const GetAllPostedJobsList = () => async dispatch =>{
    dispatch(AdminPostsRequest())
    try {

        const res = await fetch(`${url}/${adminRoutes}/allPosts`,{
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(AdminPostsError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;
        const posts = data?.posts;

        dispatch(AdminPosts({posts,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(AdminPostsError(error));
    }
}

export const LogoutAdmin = ()=> async dispatch =>{
    localStorage.removeItem('token');

    dispatch(AdminLogout());
}
