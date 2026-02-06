import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
const loadCartFromStorage=()=>{
    const storedCart=localStorage.getItem("cart")
    return storedCart?JSON.parse(storedCart):{products:[]};

};
//heper fucnton tosave cart to local strgaew
const saveCartToStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
}

//frech cart or user or guest
export const fetchCart=createAsyncThunk("cart/fetchCart",async ({userId,guestId},
    {rejectWithValue}
)=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,

            {
                params:{userId,guestId},
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data)
        
    }
})

//add an item to the cartfor uswer or guest
export const addToCart=createAsyncThunk("cart/addToCart",async({
    productId,quantity,size,color,guestId,userId},{rejectWithValue}
)=>{
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {productId,
            quantity,
            size,
            color,
            guestId,userId,
        })
        return response.data;
    } 
catch (error) {
    return rejectWithValue(error.response?.data);
        
    }
});


//upadte the qunatiti of an item in cart
export const updateCartItemQuantity=createAsyncThunk(
    "cart/updateCartItemQuantity",async({productId,quantity,guestId,userId,size,color},{rejectWithValue})=>{
        try {
            const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                productId,
                quantity,
                guestId,userId,

                size,color,

            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)
//remove an item from the cart
export const removeFromCart=createAsyncThunk("cart/removeFromCart",async({productId,guestId,userId,size,color},{rejectWithValue})=>{
    try {
        const response=await axios({
            method:"DELETE",
            url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data:{productId,guestId,userId,size,color}
        })
        return response.data;
        
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
})

//merge guestCart into user Cart
export const mergeCart=createAsyncThunk("cart/mergeCart",async({guestId,user},{rejectWithValue})=>{
    try {
        const response=await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{guestId,user},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
})

//create cart slice

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromStorage(),
        loading:false,
        error:null,
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]}
            localStorage.removeItem("cart")
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetchCart";
        })
        .addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to add to Cart";
        })
         .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(updateCartItemQuantity.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to update item quantity to Cart";
        })
        .addCase(removeFromCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to remove item from Cart";
        })
        .addCase(mergeCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(mergeCart.fulfilled,(state,action)=>{
            state.loading=false;
            state.cart=action.payload;
            saveCartToStorage(action.payload)
        })
        .addCase(mergeCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to merge Cart";
        })
    }
})
export const {clearCart}=cartSlice.actions;
export default cartSlice.reducer;