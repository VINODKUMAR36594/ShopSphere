import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
// import { act, use } from 'react';

export const fetchUsers=createAsyncThunk("admin/fetchUsers",async()=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URl}/api/admin/users`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    })
     response.data;
})

export const addUser=createAsyncThunk("admin/addUser",async(userData,{rejectWithValue})=>{
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URl}/api/admin/users`,userData,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
})

//update user info
export const updateUser=createAsyncThunk("admin/updateUser",async({id,name,email,role})=>{
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URl}/api/admin/users/${id}`,{name,email,role},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
     response.data;
})


export const deleteUser=createAsyncThunk("admin/deleteUser",async(id)=>{
await axios.delete(`${import.meta.env.VITE_BACKEND_URl}/api/admin/users/${id}`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
})
return id;
})
const adminSlice=createSlice({
    name:"admin",
    initialState:{
        users:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=true;
            state.error=action.payload?.message;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            const updatedUser=action.payload;
            const userIndex=state.users.findIndex((user)=>user._id===updateUser._id)
            if(userIndex!==-1) {
                state.users[userIndex]=updatedUser;
            }
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.users=state.users.filter((user)=>user._id!==action.payload)
        })
        .addCase(addUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.users.push(action.payload.user);//add users

        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message;
        })
    }
})

export default adminSlice.reducer;
