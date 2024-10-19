const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itemsdb')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Define Item Schema with price and image
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
});

// Item model
const Item = mongoose.model('Item', itemSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({ storage });

// POST request to add a new item with image upload
app.post('/api/items', upload.single('image'), async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file ? `/uploads/${req.file.filename}` : '', // Save image path
    });
    await newItem.save();
    res.json(newItem);
});

// GET request to fetch all items
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// DELETE request to remove a specific item by ID
app.delete('/api/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await Item.findByIdAndDelete(itemId); // Find item by ID and delete it
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
        await Item.deleteMany({}); // Remove all items from the collection
        res.json({ message: 'All items deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting items', error });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
