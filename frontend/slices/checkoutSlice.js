import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/checkout`;

/* =========================================================
   CREATE CHECKOUT
========================================================= */
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (
    { checkoutItems, shippingAddress, paymentMethod, totalPrice },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        API_URL,
        {
          checkoutItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
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
        error.response?.data?.message || "Checkout creation failed"
      );
    }
  }
);

/* =========================================================
   PAY CHECKOUT
========================================================= */
export const payCheckout = createAsyncThunk(
  "checkout/payCheckout",
  async ({ checkoutId, paymentDetails }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.put(
        `${API_URL}/${checkoutId}/pay`,
        {
          paymentStatus: "Paid",
          paymentDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.checkout;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment failed"
      );
    }
  }
);

/* =========================================================
   FINALIZE CHECKOUT (CREATE ORDER)
========================================================= */
export const finalizeCheckout = createAsyncThunk(
  "checkout/finalizeCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `${API_URL}/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // returns ORDER
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Finalize checkout failed"
      );
    }
  }
);

/* =========================================================
   SLICE
========================================================= */
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCheckout: (state) => {
      state.checkout = null;
      state.order = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== CREATE CHECKOUT ===== */
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== PAY CHECKOUT ===== */
      .addCase(payCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(payCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FINALIZE CHECKOUT ===== */
      .addCase(finalizeCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalizeCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // ORDER created
        state.success = true;
      })
      .addCase(finalizeCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
