import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddItems = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    desc: '',
    images: ['', '', '', ''], // Array to hold four image URLs
    category: '',
  });

  const mode = useSelector((state)=>state.mode.mode)
  const [errorMessage, setErrorMessage] = useState(null);  // For error handling
  const [successMessage, setSuccessMessage] = useState(null);  // For success handling

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.name && product.price && product.desc && product.category) {
      try {
        // Send product data to the backend API
        const response = await fetch('http://localhost:5000/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: product.name,
            description: product.desc,
            price: product.price,
            images: product.images, // Send array of image URLs
            category: product.category,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add product');
        }

        const result = await response.json();
        console.log('Added product:', result);
        
        // Optionally, show a success message
        setSuccessMessage('Product added successfully!');
        setErrorMessage(null);

        // Reset the form
        setProduct({
          name: '',
          price: '',
          desc: '',
          images: ['', '', '', ''],
          category: '',
        });
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Failed to add product. Please try again.');
        setSuccessMessage(null);
      }
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 border rounded shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Add Product</h2>
      
      {/* Show success or error messages */}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        className={`mb-2 p-2 border rounded ${mode && 'bg-gray-800'}`}
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Product Price"
        className={`mb-2 p-2 border rounded ${mode && 'bg-gray-800'}`}
        required
      />
      <textarea
        name="desc"
        value={product.desc}
        onChange={handleChange}
        placeholder="Product Description"
        className={`mb-2 p-2 border rounded ${mode && 'bg-gray-800'}`}
        required
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Product Category"
        className={`mb-2 p-2 border rounded ${mode && 'bg-gray-800'}`}
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
          className={`mb-2 p-2 border rounded ${mode && 'bg-gray-800'}`}
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
