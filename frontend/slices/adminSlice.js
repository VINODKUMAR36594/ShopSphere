import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/* =========================================================
   HELPERS
========================================================= */
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    "Content-Type": "application/json",
  },
});

/* =========================================================
   USERS (ADMIN)
========================================================= */

// GET ALL USERS
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, getAuthHeader());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load users");
    }
  }
);

// CREATE USER
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/users`,
        userData,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/users/${id}`,
        data,
        getAuthHeader()
      );
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

/* =========================================================
   PRODUCTS (ADMIN)
========================================================= */

// GET ALL PRODUCTS
export const fetchAllProductsAdmin = createAsyncThunk(
  "admin/fetchAllProductsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/products`,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load products");
    }
  }
);

/* =========================================================
   ORDERS (ADMIN)
========================================================= */

// GET ALL ORDERS
export const fetchAllOrdersAdmin = createAsyncThunk(
  "admin/fetchAllOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/order`,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load orders");
    }
  }
);

// UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/order/${orderId}`,
        { status },
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order");
    }
  }
);

// DELETE ORDER
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/admin/order/${orderId}`,
        getAuthHeader()
      );
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete order");
    }
  }
);

/* =========================================================
   SLICE
========================================================= */
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    orders: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== USERS ===== */
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(u => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      })

      /* ===== PRODUCTS ===== */
      .addCase(fetchAllProductsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ORDERS ===== */
      .addCase(fetchAllOrdersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const idx = state.orders.findIndex(o => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => o._id !== action.payload);
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
