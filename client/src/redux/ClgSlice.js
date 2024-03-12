
import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { token } from '../utils/GlobalFunctions';

const url = process.env.REACT_APP_URL;
const clgRoutes = 'api/v1/clg';

const ClgSlice = createSlice({
    name : 'clg',
    initialState : {
        loading : false,
        clg : {},
        verifiedStud : [],
        verifiedAlumni : [],
        UnverifiedStud : [],
        UnverifiedAlumni : [],
        msg : ""
    },
    reducers : {

        //------- Register the users-------------
        ClgRegisterRequest(state){
            state.loading = true
        },

        ClgRegister(state,action){
            state.loading = false
            state.clg = action.payload.clg;
            state.msg = action.payload.msg
        },

        ClgRegisterError(state,action){
            state.loading = false;
            state.clg = {}
            state.msg = action.payload
        },

        //---------------- Login the users
        ClgLoginRequest(state){
            state.loading = true
        },

        ClgLogin(state,action){
            state.loading = false
            state.clg = action.payload.clg;
            state.msg = action.payload.msg
        },

        ClgLoginError(state,action){
            state.loading = false;
            state.clg = {}
            state.msg = action.payload
        },
        //---------------- Get profile of loogged users
        ClgProfileRequest(state){
            state.loading = true
        },

        ClgProfile(state,action){
            state.loading = false
            state.clg = action.payload.clg;
            state.msg = action.payload.msg
        },

        ClgProfileError(state,action){
            state.loading = false;
            state.clg = {}
            state.msg = action.payload
        },


        ClgVerifiedStudRequest(state){
            state.loading = true
        },

        ClgVerifiedStud(state,action){
            state.loading = false
            state.verifiedStud = action.payload.stud;
            state.msg = action.payload.msg
        },

        ClgVerifiedStudError(state,action){
            state.loading = false;
            state.verifiedStud = []
            state.msg = action.payload
        },
        ClgVerifiedAlumniRequest(state){
            state.loading = true
        },

        ClgVerifiedAlumni(state,action){
            state.loading = false
            state.verifiedAlumni = action.payload.alumni;
            state.msg = action.payload.msg
        },

        ClgVerifiedAlumniError(state,action){
            state.loading = false;
            state.verifiedAlumni = []
            state.msg = action.payload
        },


        ClgUnverifiedStudRequest(state){
            state.loading = true
        },

        ClgUnverifiedStud(state,action){
            state.loading = false
            state.UnverifiedStud = action.payload.stud;
            state.msg = action.payload.msg
        },

        ClgUnverifiedStudError(state,action){
            state.loading = false;
            state.UnverifiedStud = []
            state.msg = action.payload
        },
        ClgUnverifiedAlumniRequest(state){
            state.loading = true
        },

        ClgUnverifiedAlumni(state,action){
            state.loading = false
            state.UnverifiedAlumni = action.payload.alumni;
            state.msg = action.payload.msg
        },

        ClgUnverifiedAlumniError(state,action){
            state.loading = false;
            state.UnverifiedAlumni = []
            state.msg = action.payload
        },

        //----------- Verify the students and alumnis
        ClgVerifyUnverifyUserRequest(state){
            state.loading = true
        },

        ClgVerifyUnverifyUser(state,action){
            state.loading = false
            state.verifiedAlumni.push(state.UnverifiedAlumni.filter(item => item._id === action.payload._id))
            state.UnverifiedAlumni = state.UnverifiedAlumni.filter(item => item._id !== action.payload._id);
            state.msg = action.payload.msg
        },

        ClgVerifyUnverifyUserError(state,action){
            state.loading = false;
            state.msg = action.payload
        },

        //------------ Delete the users by the clgs
        ClgDeleteUserRequest(state){
            state.loading = true
        },

        ClgDeleteUser(state,action){
            state.loading = false
            state.verifiedAlumni = state.verifiedAlumni.filter(item => item._id !== action.payload._id)
            state.UnverifiedAlumni = state.UnverifiedAlumni.filter(item => item._id !== action.payload._id);
            state.msg = action.payload.msg
        },

        ClgDeleteUserError(state,action){
            state.loading = false;
            state.msg = action.payload
        },

        ClgLogout(state){
            state.clg = {}
            state.verifiedStud = []
            state.verifiedAlumni = []
            state.UnverifiedStud = []
            state.UnverifiedAlumni = []
            state.loading = false;
            state.msg = "";
        },


        //------------ Clear all the error
        ClearClgSlice(state){
            state.loading = false;
            state.msg = ""
        } 
    }
});

export const {ClgRegister,ClgRegisterError,ClgRegisterRequest,ClgLogin,ClgLoginError,ClgLoginRequest, ClgProfile,ClgProfileError,ClgProfileRequest,ClgVerifiedStud,ClgVerifiedStudError,ClgVerifiedStudRequest,ClgVerifiedAlumni,ClgVerifiedAlumniError,ClgVerifiedAlumniRequest,ClgUnverifiedStud,ClgUnverifiedAlumni,ClgUnverifiedAlumniError,ClgUnverifiedAlumniRequest,ClgUnverifiedStudError,ClgUnverifiedStudRequest, ClgLogout,ClgVerifyUnverifyUser,ClgVerifyUnverifyUserError,ClgVerifyUnverifyUserRequest,ClgDeleteUser,ClgDeleteUserError,ClgDeleteUserRequest} = ClgSlice.actions

export default ClgSlice.reducer;


//--------------- Creating the redux thunk middlewares
export const RegisterClg = (form) => async dispatch =>{
    dispatch(ClgRegisterRequest())
    try {
console.log(form)
        const res = await fetch(`${url}/${clgRoutes}/clg-register`,{
            method : 'POST',
            // headers : {
            //     'Content-Type' : "application/json",
            // },
            body:form
        });

        const data = await res.json();

        console.log(data)

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(ClgRegisterError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //Set token on localStorage
        const token = data?.token;
        localStorage.setItem('token',token);
        

        //------- Set the users
        const msg = data?.msg;
        const clg = data?.college;

        dispatch(ClgRegister({clg,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(ClgRegisterError(error));
    }
}


export const LoginClg= (form) => async dispatch =>{
    dispatch(ClgLoginRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/clg-login`,{
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
            dispatch(ClgLoginError(data.msg));
            return
        }


        toast.success(data?.msg)

        //Set token on localStorage
        const token = data?.token;
        localStorage.setItem('token',token);
        

        //------- Set the users
        const msg = data?.msg;
        const clg = data?.college;

        dispatch(ClgLogin({clg,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(ClgLoginError(error));
    }
}


//--------------- Get the profile of logged users
export const ProfileClg = () => async dispatch =>{
    dispatch(ClgProfileRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/clg-profile`,{
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
            dispatch(ClgProfileError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const clg = data?.college;

        dispatch(ClgProfile({clg,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(ClgProfileError(error));
    }
}


export const GetAllClgStudentVerifiedList = () => async dispatch =>{
    dispatch(ClgVerifiedStudRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/clg-student-verified-list`,{
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
            dispatch(ClgVerifiedStudError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const stud = data?.students;

        dispatch(ClgVerifiedStud({stud,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(ClgVerifiedStudError(error));
    }
}


export const GetAllClgAlumniVerifiedList = () => async dispatch =>{
    dispatch(ClgVerifiedAlumniRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/clg-alumni-verified-list`,{
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
            dispatch(ClgVerifiedAlumniError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        console.log(data?.alumnis,'alumnis')
        const alumnis = data?.alumnis;

        dispatch(ClgVerifiedAlumni({alumnis,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(ClgVerifiedAlumniError(error));
    }
}

export const GetAllClgStudentList = () => async dispatch =>{
    dispatch(ClgUnverifiedStudRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/clg-student-list`,{
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
            dispatch(ClgUnverifiedStudError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const stud = data?.students;

        dispatch(ClgUnverifiedStud({stud,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(ClgUnverifiedStudError(error));
    }
}


export const GetAllClgAlumniList = () => async dispatch =>{
    dispatch(ClgUnverifiedAlumniRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/clg-alumni-list`,{
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
            dispatch(ClgUnverifiedAlumniError(data.msg));
            return
        }


        toast.success(data?.msg)
       

        //------- Set the users
        const msg = data?.msg;
        const alumnis = data?.alumnis;
        console.log(alumnis,'un-verify alumnis')


        dispatch(ClgUnverifiedAlumni({alumnis,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error);

        dispatch(ClgUnverifiedAlumniError(error));
    }
}


export const VerifyUserByClg = (_id) => async dispatch =>{
    dispatch(ClgVerifyUnverifyUserRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/verify-user-by-clg/${_id}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(ClgVerifyUnverifyUserError(data.msg));
            return
        }

        console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;

        dispatch(ClgVerifyUnverifyUser({_id,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(ClgVerifyUnverifyUserError(error));
    }
}

export const DeleteUserByClg = (_id) => async dispatch =>{
    dispatch(ClgDeleteUserRequest())
    try {

        const res = await fetch(`${url}/${clgRoutes}/delete-user-by-clg/${_id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : "application/json",
                'auth-token':token
            }
        });

        const data = await res.json();

        if(data?.success === false){
            toast.error(data?.msg)
            dispatch(ClgDeleteUserError(data.msg));
            return
        }

        // console.log('data' ,data);

        toast.success(data?.msg)

        //------- Set the users
        const msg = data?.msg;

        dispatch(ClgDeleteUser({_id,msg}))

    } catch (error) {
        console.log(error);
        toast.error(error)
        dispatch(ClgDeleteUserError(error));
    }
}


export const LogoutClg = () => async dispatch =>{
    localStorage.removeItem('token');

    dispatch(ClgLogout())
}