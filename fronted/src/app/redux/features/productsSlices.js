// src/features/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      localStorage.setItem('products', JSON.stringify(action.payload));
    },
    loadProducts: (state) => {
      const savedProducts = JSON.parse(localStorage.getItem('products'));
      // If no saved products, use initial state
      if (savedProducts) {
        state.products = savedProducts;
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.products)); // Update localStorage
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.products)); // Update localStorage
    },
  },
});

export const { setProducts, loadProducts, addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
