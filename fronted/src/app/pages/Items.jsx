// import React, { useState, useEffect } from 'react';
// import { MdDelete } from 'react-icons/md';
// import { FiEdit } from 'react-icons/fi';
// import { FaCheck } from 'react-icons/fa';
// import { useSelector } from 'react-redux';

// const Items = () => {
//     // Local state for products
//     const [products, setProducts] = useState([]);
    
//     const mode = useSelector((state)=>state.mode.mode)
//     // State to track which product is being edited
//     const [editingProductId, setEditingProductId] = useState(null);
//     const [editedProduct, setEditedProduct] = useState({
//         name: '',
//         price: '',
//         description: '',
//         category: '',
//         images: [] // Add images field here
//     });

//     // Fetch all products from the backend API on component mount
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/items');
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Error loading products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Handle product removal
//     const handleRemoveProduct = async (id) => {
//         try {
//             await fetch(`http://localhost:5000/api/items/${id}`, {
//                 method: 'DELETE',
//             });
//             // Remove the product locally after successful deletion
//             setProducts(products.filter((product) => product._id !== id));
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };

//     // Handle Edit button click
//     const handleEditClick = (product) => {
//         setEditingProductId(product._id);
//         setEditedProduct({
//             name: product.name,
//             price: product.price,
//             description: product.description,
//             category: product.category,
//             images: product.images || [] // Ensure images are included
//         });
//     };

//     // Handle input change in the edit form
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedProduct({ ...editedProduct, [name]: value });
//     };

//     // Handle image input change
//     const handleImageChange = (e, index) => {
//         const updatedImages = [...editedProduct.images];
//         updatedImages[index] = e.target.value; // Update the specific image at index
//         setEditedProduct({ ...editedProduct, images: updatedImages });
//     };

//     // Add a new image input
//     const handleAddImageField = () => {
//         setEditedProduct({ ...editedProduct, images: [...editedProduct.images, ''] });
//     };

//     // Handle Save button click
//     const handleSaveClick = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/items/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(editedProduct),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update product');
//             }

//             const updatedProduct = await response.json();

//             // Update product in the local state
//             setProducts(products.map((product) => (product._id === id ? updatedProduct : product)));
//             // Exit edit mode
//             setEditingProductId(null);
//         } catch (error) {
//             console.error('Error updating product:', error);
//         }
//     };
//     console.log(products);
    
//     return (
//         <div className="p-4">
//             <h2 className="mt-6 text-2xl font-bold">Product List:</h2>
//             <ul className="mt-4 flex justify-center items-center flex-col">
//                 {products.map((product) => (
//                     <li key={product._id} className="p-2 border-b flex flex-col sm:flex-row">
//                         {editingProductId === product._id ? (
//                             // If editing, show input fields
//                             <div className="flex-1">
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={editedProduct.name}
//                                     onChange={handleInputChange}
//                                     className={`border p-1 mr-2 w-[200px] ${mode && 'bg-gray-800'}`}
//                                 />
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={editedProduct.price}
//                                     onChange={handleInputChange}
//                                     className={`border p-1 mr-2 w-[100px] ${mode && 'bg-gray-800'}`}
//                                 />
//                                 <input
//                                     type="text"
//                                     name="description"
//                                     value={editedProduct.description}
//                                     onChange={handleInputChange}
//                                     className={`border p-1 mr-2 w-[300px] ${mode && 'bg-gray-800'}`}
//                                 />
//                                 <input
//                                     type="text"
//                                     name="category"
//                                     value={editedProduct.category}
//                                     onChange={handleInputChange}
//                                     className={`border p-1 mr-2 w-[150px] ${mode && 'bg-gray-800'}`}
//                                 />

//                                 {/* Edit image fields */}
//                                 <div className="mt-2">
//                                     <label className="block font-bold">Edit Images:</label>
//                                     {editedProduct.images.map((img, index) => (
//                                         <div key={index} className="flex items-center mt-1">
//                                             <input
//                                                 type="text"
//                                                 value={img}
//                                                 onChange={(e) => handleImageChange(e, index)}
//                                                 className={`border p-1 w-[250px] ${mode && 'bg-gray-800'}`}
//                                                 placeholder={`Image URL ${index + 1}`}
//                                             />
//                                         </div>
//                                     ))}
//                                     {/* Button to add new image field */}
//                                     <button
//                                         type="button"
//                                         onClick={handleAddImageField}
//                                         className="mt-2 bg-blue-500 text-white p-1 rounded"
//                                     >
//                                         Add Image
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             // Otherwise show product details
//                             <>
//                                 <h3 className="font-semibold w-[250px]">
//                                     {product.name} - PKR {product.price}
//                                 </h3>
//                                 <p className="w-[300px] ml-2">{product.description}</p>
//                                 <p className="text-sm text-gray-500 w-[150px]">
//                                     Category: {product.category}
//                                 </p>
//                             </>
//                         )}

//                         {/* Display images */}
//                         <div className="mt-2 flex">
//                             {product.images.map((img, index) => (
//                                 img && (
//                                     <div key={index} className="flex">
//                                         <img
//                                             src={img}
//                                             alt={`Product Image ${index + 1}`}
//                                             className="w-16 h-16 mr-4 rounded"
//                                         />
//                                     </div>
//                                 )
//                             ))}
//                         </div>

//                         {/* Remove button */}
//                         <button
//                             onClick={() => handleRemoveProduct(product._id)}
//                             className="bg-red-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center"
//                         >
//                             <MdDelete className="text-xl" />
//                         </button>

//                         {editingProductId === product._id ? (
//                             // If in edit mode, show Save button
//                             <button
//                                 onClick={() => handleSaveClick(product._id)}
//                                 className="bg-green-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center ml-1"
//                             >
//                                 <FaCheck className="text-xl" />
//                             </button>
//                         ) : (
//                             // Otherwise, show Edit button
//                             <button
//                                 onClick={() => handleEditClick(product)}
//                                 className="bg-red-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center ml-1"
//                             >
//                                 <FiEdit className="text-xl" />
//                             </button>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Items;
import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Items = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        images: [] 
    });
    const [deleteConfirmation, setDeleteConfirmation] = useState(null); // Track product to delete

    const mode = useSelector((state) => state.mode.mode);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/items');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Handle product removal
    const handleRemoveProduct = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'DELETE',
            });
            setProducts(products.filter((product) => product._id !== id));
            setDeleteConfirmation(null); // Reset confirmation state
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle delete confirmation
    const confirmDeleteProduct = (productId) => {
        setDeleteConfirmation(productId); // Set the product to confirm deletion
    };

    // Handle Edit button click
    const handleEditClick = (product) => {
        setEditingProductId(product._id);
        setEditedProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            images: product.images || []
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleImageChange = (e, index) => {
        const updatedImages = [...editedProduct.images];
        updatedImages[index] = e.target.value;
        setEditedProduct({ ...editedProduct, images: updatedImages });
    };

    const handleAddImageField = () => {
        setEditedProduct({ ...editedProduct, images: [...editedProduct.images, ''] });
    };

    const handleSaveClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            setProducts(products.map((product) => (product._id === id ? updatedProduct : product)));
            setEditingProductId(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="mt-6 text-2xl font-bold">Product List:</h2>
            <ul className="mt-4 flex justify-center items-center flex-col">
                {products.map((product) => (
                    <li key={product._id} className="p-2 border-b flex flex-col sm:flex-row">
                        {editingProductId === product._id ? (
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleInputChange}
                                    className={`border p-1 mr-2 w-[200px] ${mode && 'bg-gray-800'}`}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleInputChange}
                                    className={`border p-1 mr-2 w-[100px] ${mode && 'bg-gray-800'}`}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={editedProduct.description}
                                    onChange={handleInputChange}
                                    className={`border p-1 mr-2 w-[300px] ${mode && 'bg-gray-800'}`}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={editedProduct.category}
                                    onChange={handleInputChange}
                                    className={`border p-1 mr-2 w-[150px] ${mode && 'bg-gray-800'}`}
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
                                                className={`border p-1 w-[250px] ${mode && 'bg-gray-800'}`}
                                                placeholder={`Image URL ${index + 1}`}
                                            />
                                        </div>
                                    ))}
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
                            <>
                                <h3 className="font-semibold w-[250px]">
                                    {product.name} - PKR {product.price}
                                </h3>
                                <p className="w-[300px] ml-2 h-[300px] text-left overflow-y-auto">
                                    {product.description}
                                </p>
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
                        {deleteConfirmation === product._id ? (
                            // Show confirmation prompt
                            <div className="flex items-center space-x-2">
                                <p>Are you sure?</p>
                                <button
                                    onClick={() => handleRemoveProduct(product._id)}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setDeleteConfirmation(null)}
                                    className="bg-gray-500 text-white p-1 rounded"
                                >
                                    No
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => confirmDeleteProduct(product._id)}
                                className="bg-red-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center"
                            >
                                <MdDelete className="text-xl" />
                            </button>
                        )}

                        {editingProductId === product._id ? (
                            <button
                                onClick={() => handleSaveClick(product._id)}
                                className="bg-green-500 text-white p-1 rounded w-[40px] h-[40px] flex justify-center items-center ml-1"
                            >
                                <FaCheck className="text-xl" />
                            </button>
                        ) : (
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
