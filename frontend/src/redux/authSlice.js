import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const userFromStorage=localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null

const intialGuestId=localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId",intialGuestId)


const intialState={
    user:userFromStorage,
        guestId:intialGuestId,
        loading:false,
        error:null,
    }


    //async login thumb's
     export const loginUser=createAsyncThunk('auth/loginUser',async(userData,{rejectWithValue})=>{
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,userData)
            localStorage.setItem("userInfo",JSON.stringify(response.data.user));
            localStorage.setItem("userToken",response.data.token);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
     })
     export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        userData
      );

      // store user info and token
      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.user)
      );
      localStorage.setItem(
        "userToken",
        response.data.token
      );

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

//slice 
const authSlice=createSlice({
    name:"auth",
    intialState,
    reducers:{
        logout:(state)=>{
            state.user=null,
            state.guestId=`guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo")
            localStorage.removeItem('userToken')
            localStorage.setItem('guestId',state.guestId)
        },
        generateNewGuestId: (state)=>{
            state.guestId
        }
    }
})