
import {configureStore} from '@reduxjs/toolkit'
import UsersSlice from './UsersSlice'
import ClgSlice from './ClgSlice';
import AdminSlice from './AdminSlice';

const Store = configureStore({
    reducer : {
        users : UsersSlice,
        clg : ClgSlice,
        admin:AdminSlice
    }
})

export default Store;