// src/components/AddProduct.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/features/productsSlices';

const AddItems = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: Date.now(), // Generate a unique ID based on the current timestamp
    name: '',
    price: '',
    desc: '',
    images: ['', '', '', ''], // Array to hold four image URLs
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes for image fields separately
    if (name.startsWith('image')) {
      const index = parseInt(name.replace('image', ''), 10); // Get the index from the name
      const newImages = [...product.images];
      newImages[index] = value; // Update the corresponding image URL
      setProduct((prev) => ({ ...prev, images: newImages }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.price && product.desc && product.category) {
      dispatch(addProduct(product));
      // Reset the form
      setProduct({ id: Date.now(), name: '', price: '', desc: '', images: ['', '', '', ''], category: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 border rounded shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Add Product</h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="mb-2 p-2 border rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Product Price"
        className="mb-2 p-2 border rounded"
        required
      />
      <textarea
        name="desc"
        value={product.desc}
        onChange={handleChange}
        placeholder="Product Description"
        className="mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Product Category"
        className="mb-2 p-2 border rounded"
        required
      />
      {/* Image fields */}
      <h3 className="mt-4 mb-2 font-semibold">Image URLs:</h3>
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          type="text"
          name={`image${index}`}
          value={product.images[index]}
          onChange={handleChange}
          placeholder={`Image URL ${index + 1}`}
          className="mb-2 p-2 border rounded"
          required
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Product
      </button>
    </form>
  );
};

export default AddItems;
