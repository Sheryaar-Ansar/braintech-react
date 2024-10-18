import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Change to handle file input

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Add new item to the backend
  const addItem = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      await axios.post('http://localhost:5000/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      fetchItems();  // Refetch items to show the new list including the added item
      setName('');
      setDescription('');
      setPrice('');
      setImage(null); // Reset image input
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Use useEffect to fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);
  console.log(items);
  

  return (
    <div>
      <h1>Item List</h1>
      
      {/* Form to add new item */}
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Item description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Item price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Set the selected file
      />
      <button onClick={addItem}>Add Item</button>

      {/* Display the list of items */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.name}:</strong> {item.description} - ${item.price}
            {item.image && <img src={item.image} alt={item.name} style={{ width: '100px', marginLeft: '10px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemPage;
