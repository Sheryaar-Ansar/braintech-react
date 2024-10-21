import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, removeProduct, updateProduct } from '../redux/features/productsSlices'; // Assuming updateProduct action is in slices
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const Items = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    
    // State to track which product is being edited
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: '',
        desc: '',
        category: '',
        images: [] // Add images field here
    });

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    const handleRemoveProduct = (id) => {
        dispatch(removeProduct(id));
    };

    // Handle Edit button click
    const handleEditClick = (product) => {
        setEditingProductId(product.id);
        setEditedProduct({
            name: product.name,
            price: product.price,
            desc: product.desc,
            category: product.category,
            images: product.images || [] // Ensure images are included
        });
    };

    // Handle input change in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    // Handle image input change
    const handleImageChange = (e, index) => {
        const updatedImages = [...editedProduct.images];
        updatedImages[index] = e.target.value; // Update the specific image at index
        setEditedProduct({ ...editedProduct, images: updatedImages });
    };

    // Add a new image input
    const handleAddImageField = () => {
        setEditedProduct({ ...editedProduct, images: [...editedProduct.images, ''] });
    };

    // Handle Save button click
    const handleSaveClick = (id) => {
        // Dispatch the updated product to the store
        dispatch(updateProduct({ id, ...editedProduct }));
        // Exit edit mode
        setEditingProductId(null);
    };

    return (
        <div className="p-4">
            <h2 className="mt-6 text-2xl font-bold">Product List:</h2>
            <ul className="mt-4 flex justify-center items-center flex-col">
                {products.map((product) => (
                    <li key={product.id} className="p-2 border-b flex flex-col sm:flex-row">
                        {editingProductId === product.id ? (
                            // If editing, show input fields
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleInputChange}
                                    className="border p-1 mr-2 w-[200px]"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleInputChange}
                                    className="border p-1 mr-2 w-[100px]"
                                />
                                <input
                                    type="text"
                                    name="desc"
                                    value={editedProduct.desc}
                                    onChange={handleInputChange}
                                    className="border p-1 mr-2 w-[300px]"
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={editedProduct.category}
                                    onChange={handleInputChange}
                                    className="border p-1 mr-2 w-[150px]"
                                />

                                {/* Edit image fields */}
                                <div className="mt-2">
                                    <label className="block font-bold">Edit Images:</label>
                                    {editedProduct.images.map((img, index) => (
                                        <div key={index} className="flex items-center mt-1">
                                            <input
                                                type="text"
                                                value={img}
                                                onChange={(e) => handleImageChange(e, index)}
                                                className="border p-1 w-[250px]"
                                                placeholder={`Image URL ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                    {/* Button to add new image field */}
                                    <button
                                        type="button"
                                        onClick={handleAddImageField}
                                        className="mt-2 bg-blue-500 text-white p-1 rounded"
                                    >
                                        Add Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Otherwise show product details
                            <>
                                <h3 className="font-semibold w-[250px]">
                                    {product.name} - PKR {product.price.toLocaleString()}
                                </h3>
                                <p className="w-[300px] ml-2">{product.desc}</p>
                                <p className="text-sm text-gray-500 w-[150px]">
                                    Category: {product.category}
                                </p>
                            </>
                        )}

                        {/* Display images */}
                        <div className="mt-2 flex">
                            {product.images.map((img, index) => (
                                img && (
                                    <div key={index} className="flex">
                                        <img
                                            src={img}
                                            alt={`Product Image ${index + 1}`}
                                            className="w-16 h-16 mr-4 rounded"
                                        />
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Remove button */}
                        <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="bg-red-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center"
                        >
                            <MdDelete className="text-xl" />
                        </button>

                        {editingProductId === product.id ? (
                            // If in edit mode, show Save button
                            <button
                                onClick={() => handleSaveClick(product.id)}
                                className="bg-green-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center ml-1"
                            >
                                <FaCheck className="text-xl" />
                            </button>
                        ) : (
                            // Otherwise, show Edit button
                            <button
                                onClick={() => handleEditClick(product)}
                                className="bg-red-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center ml-1"
                            >
                                <FiEdit className="text-xl" />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Items;
