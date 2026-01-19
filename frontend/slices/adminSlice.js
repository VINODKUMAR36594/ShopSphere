import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/* =====================================================
   AUTH HEADER
===================================================== */
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    "Content-Type": "application/json",
  },
});

/* =====================================================
   USERS (ADMIN CRUD)
===================================================== */
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, authHeader());
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "admin/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/users`,
        data,
        authHeader()
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/users/${id}`,
        data,
        authHeader()
      );
      return res.data.user;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, authHeader());
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* =====================================================
   PRODUCTS (ADMIN FULL CRUD)
===================================================== */
export const fetchAllProductsAdmin = createAsyncThunk(
  "admin/fetchAllProductsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/products`,
        authHeader()
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const createProductAdmin = createAsyncThunk(
  "admin/createProductAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/products`,
        data,
        authHeader()
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const updateProductAdmin = createAsyncThunk(
  "admin/updateProductAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        data,
        authHeader()
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const deleteProductAdmin = createAsyncThunk(
  "admin/deleteProductAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/products/${id}`,
        authHeader()
      );
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* =====================================================
   ORDERS (ADMIN CRUD)
===================================================== */
export const fetchAllOrdersAdmin = createAsyncThunk(
  "admin/fetchAllOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/order`,
        authHeader()
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/admin/order/${id}`,
        { status },
        authHeader()
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const deleteOrderAdmin = createAsyncThunk(
  "admin/deleteOrderAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/admin/order/${id}`,
        authHeader()
      );
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

/* =====================================================
   SLICE
===================================================== */
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* USERS */
      .addCase(fetchAllUsers.fulfilled, (s, a) => {
        s.users = a.payload;
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.users = s.users.filter(u => u._id !== a.payload);
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        const i = s.users.findIndex(u => u._id === a.payload._id);
        if (i !== -1) s.users[i] = a.payload;
      })

      /* PRODUCTS */
      .addCase(fetchAllProductsAdmin.fulfilled, (s, a) => {
        s.products = a.payload;
      })
      .addCase(createProductAdmin.fulfilled, (s, a) => {
        s.products.push(a.payload);
      })
      .addCase(updateProductAdmin.fulfilled, (s, a) => {
        const i = s.products.findIndex(p => p._id === a.payload._id);
        if (i !== -1) s.products[i] = a.payload;
      })
      .addCase(deleteProductAdmin.fulfilled, (s, a) => {
        s.products = s.products.filter(p => p._id !== a.payload);
      })

      /* ORDERS */
      .addCase(fetchAllOrdersAdmin.fulfilled, (s, a) => {
        s.orders = a.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        const i = s.orders.findIndex(o => o._id === a.payload._id);
        if (i !== -1) s.orders[i] = a.payload;
      })
      .addCase(deleteOrderAdmin.fulfilled, (s, a) => {
        s.orders = s.orders.filter(o => o._id !== a.payload);
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
