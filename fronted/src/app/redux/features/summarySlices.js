// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   orderDetails: JSON.parse(localStorage.getItem('Order')) || null, // Initialize from localStorage
// };

// export const summarySlices = createSlice({
//   name: 'summary',
//   initialState,
//   reducers: {
//     // Save order summary and persist to localStorage
//     saveOrderSummary: (state, action) => {
//       state.orderDetails = [...state.orderDetails, action.payload]; // Save order summary to the state
//       localStorage.setItem('Order', JSON.stringify(state.orderDetails)); // Persist to localStorage
//     },
//     removeOrderSummary: (state) => {
//       state.orderDetails = null; // Clear order details
//       localStorage.removeItem('Order'); // Remove from localStorage
//     },
//   },
// });

// // Export actions and reducer
// export const { saveOrderSummary, removeOrderSummary } = summarySlices.actions;
// export default summarySlices.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: JSON.parse(localStorage.getItem('Order')) || [], // Initialize from localStorage or set to empty array
};

export const summarySlices = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    // Save order summary and persist to localStorage
    saveOrderSummary: (state, action) => {
      // Append new order to the existing list
      state.orderDetails.push(action.payload); 
      
      // Save the updated order details to localStorage
      localStorage.setItem('Order', JSON.stringify(state.orderDetails)); 
    },
    // Remove all order summaries
    removeOrderSummary: (state, action) => {
      // Remove the order at the specific index
      state.orderDetails = state.orderDetails.filter((_, index) => index !== action.payload);
      localStorage.setItem('Order', JSON.stringify(state.orderDetails)); // Update localStorage with remaining orders
    },
  },
});

// Export actions and reducer
export const { saveOrderSummary, removeOrderSummary } = summarySlices.actions;
export default summarySlices.reducer;
