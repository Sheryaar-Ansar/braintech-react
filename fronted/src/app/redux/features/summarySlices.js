import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: JSON.parse(localStorage.getItem('Order')) || null, // Initialize from localStorage
};

export const summarySlices = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    // Save order summary and persist to localStorage
    saveOrderSummary: (state, action) => {
      state.orderDetails = action.payload; // Save order summary to the state
      localStorage.setItem('Order', JSON.stringify(action.payload)); // Persist to localStorage
    },
    removeOrderSummary: (state) => {
      state.orderDetails = null; // Clear order details
      localStorage.removeItem('Order'); // Remove from localStorage
    },
  },
});

// Export actions and reducer
export const { saveOrderSummary, removeOrderSummary } = summarySlices.actions;
export default summarySlices.reducer;
