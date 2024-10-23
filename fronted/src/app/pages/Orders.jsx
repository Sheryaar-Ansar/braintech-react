import React, { useState } from 'react';
import { IoReloadOutline } from "react-icons/io5";
import { MdDelete, MdDone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { removeOrderSummary } from '../redux/features/summarySlices';

const Orders = () => {
  const orderDetails = useSelector((state) => state.summary.orderDetails);
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  const [deliveryStatus, setDeliveryStatus] = useState(
    orderDetails.map(() => 'Processing') // Initialize all statuses as 'Processing'
  );

  const handleDeliveryStatusChange = (index) => {
    setDeliveryStatus((prevStatus) =>
      prevStatus.map((status, idx) => (idx === index ? (status === 'Processing' ? 'Delivered' : 'Processing') : status))
    );
  };

  // Function to handle order deletion
  const handleDeleteOrder = (idx) => {
    dispatch(removeOrderSummary(idx)); // Pass index of the specific order
  };

  return (
    <div className={`mt-10`}>
      <h1>Welcome to the Orders Page</h1>
      <div>
        <h1 className="text-2xl font-bold mb-5">Order Summary</h1>
        {orderDetails === null ? (
          <div className="text-3xl text-center uppercase font-mono">No Orders Yet</div>
        ) : (
          <div className="mb-4 border">
            {orderDetails.length > 0 ? (
              orderDetails.map((user, idx) => {
                const totalAmount = user.products.reduce((total, product) => total + product.price * product.qty, 0);

                return (
                  <div className="flex" key={idx}>
                    <h2 className="text-lg font-semibold ml-3">✦</h2>
                    <div className={`ml-10 mt-6`}>
                      <p className={`text-gray-700 font-bold ${mode && 'text-white'}`}>
                        Name: <span className="font-normal">{user.buyerName}</span>
                      </p>
                      <p className={`text-gray-700 font-bold ${mode && 'text-white'}`}>
                        Email: <span className="font-normal">{user.buyerEmail}</span>
                      </p>
                      <p className={`text-gray-700 font-bold ${mode && 'text-white'}`}>
                        Address: <span className="font-normal">{user.buyerAddress}</span>
                      </p>
                      <p className={`text-gray-700 font-bold ${mode && 'text-white'}`}>
                        City: <span className="font-normal">{user.buyerCity}</span>
                      </p>
                    </div>
                    <div className="ml-16">
                      <h2 className="text-lg font-semibold">Selected Products:</h2>
                      {user.products.length > 0 ? (
                        <ul className={`list-disc ${mode && 'text-white'}`}>
                          {user.products.map((product, index) => (
                            <li key={index} className="text-gray-600">
                              <h1 className="font-bold">
                                Product Name: <span className="font-normal">{product.name}</span>
                              </h1>
                              <p className="font-bold">
                                Product Price: <span className="font-normal">PKR {product.price.toLocaleString()} x {product.qty}</span>
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">No products selected.</p>
                      )}
                    </div>
                    <div className="ml-13 w-[300px]">
                      <h1 className="text-lg font-semibold">Total Amount:</h1>
                      <div>
                        <h1 className="font-semibold">Price: <span className="font-normal">{totalAmount.toLocaleString()} -/PKR</span></h1>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">Delivery Status:</h1>
                      <div>
                        <button
                          className={`w-[150px] h-[40px] ${
                            deliveryStatus[idx] === 'Delivered'
                              ? 'bg-green-600 border border-green-600 hover:shadow-md hover:shadow-green-500'
                              : 'border bg-red-500 border-red-500 hover:shadow-md hover:shadow-red-500'
                          } text-white uppercase transition-shadow duration-300 select-none cursor-not-allowed`}
                        >
                          {deliveryStatus[idx]}
                        </button>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">Clicks:</h1>
                      <div className="flex">
                        <MdDelete className="text-3xl text-red-700 cursor-pointer" onClick={() => handleDeleteOrder(idx)} />
                        {deliveryStatus[idx] === 'Processing' ? (
                          <MdDone
                            className="text-3xl text-green-700 bg-green-400 p-2 rounded-full cursor-pointer"
                            onClick={() => handleDeliveryStatusChange(idx)}
                          />
                        ) : (
                          <IoReloadOutline
                            className="text-3xl text-green-700 bg-green-400 p-2 rounded-full cursor-pointer"
                            onClick={() => handleDeliveryStatusChange(idx)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-xl uppercase">Order Cart Empty</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
