const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itemsdb')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Define Item Schema with multiple image URLs
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [String], // Array to hold multiple image URLs
    category: String, // Add category if needed
});

// Item model
const Item = mongoose.model('Item', itemSchema);

// POST request to add a new item with image URLs
app.post('/api/items', async (req, res) => {
    const { name, description, price, images, category } = req.body;
    
    const newItem = new Item({
        name,
        description,
        price,
        images,  // Store array of image URLs
        category,
    });
    
    await newItem.save();
    res.json(newItem);
});

// GET request to fetch all items
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// GET request to fetch a single item by ID
app.get('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
});

// PUT request to update an item by ID
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await Item.findByIdAndUpdate(id, updatedProductData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

// DELETE request to remove a specific item by ID
app.delete('/api/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});

// DELETE request to remove all items
app.delete('/api/items', async (req, res) => {
    try {
        await Item.deleteMany({});
        res.json({ message: 'All items deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting items', error });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
