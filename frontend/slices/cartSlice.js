import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

/* =========================================================
   LOCAL STORAGE HELPERS
========================================================= */
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/* =========================================================
   FETCH CART
========================================================= */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: { userId, guestId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

/* =========================================================
   ADD TO CART
========================================================= */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_URL, {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

/* =========================================================
   UPDATE CART ITEM
========================================================= */
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { productId, quantity, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(API_URL, {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

/* =========================================================
   REMOVE FROM CART
========================================================= */
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { productId, size, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(API_URL, {
        data: { productId, size, color, userId, guestId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

/* =========================================================
   MERGE GUEST CART → USER CART
========================================================= */
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `${API_URL}/merge`,
        { guestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to merge cart"
      );
    }
  }
);

/* =========================================================
   SLICE
========================================================= */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      saveCartToStorage(state.cart);
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== FETCH CART ===== */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD TO CART ===== */
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE CART ITEM ===== */
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== REMOVE FROM CART ===== */
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== MERGE CART ===== */
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(state.cart);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
