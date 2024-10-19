// src/components/ProductComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, removeProduct } from '../redux/features/productsSlices';

const Items = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    const handleRemoveProduct = (id) => {
        dispatch(removeProduct(id));
    };
    console.log(products);
    

    return (
        <div className="p-4">
            <h2 className="mt-6 text-2xl font-bold">Product List:</h2>
            <ul className="mt-4 ">
                {products.map((product) => (
                    <li key={product.id} className="p-2 border-b flex">
                        <h3 className="font-semibold">{product.name} - ${product.price}</h3>
                        <p>{product.desc}</p>
                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                        {/* Display images */}
                        <div className="mt-2 flex">
                            {product.images.map((img, index) => (
                                img && (
                                    <div key={index} className='flex'>
                                        <img src={img} alt={`Product Image ${index + 1}`} className="w-16 h-16 mr-2 rounded" />
                                    </div>
                                )
                            ))}
                        </div>
                        {/* Remove button */}
                        <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="bg-red-500 text-white p-1 rounded w-[150px] h-[40px]"
                        >
                            Remove Product
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Items;

