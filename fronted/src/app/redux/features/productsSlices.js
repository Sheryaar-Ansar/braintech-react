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
    updateProduct: (state, action) => {
      const { id, name, price, desc, category } = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === id);

      // If product is found, update it
      if (productIndex >= 0) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          name,
          price,
          desc,
          category,
        };
      }

      // Update localStorage
      localStorage.setItem('products', JSON.stringify(state.products));
    },
  },
});

export const { setProducts, loadProducts, addProduct, removeProduct, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;
