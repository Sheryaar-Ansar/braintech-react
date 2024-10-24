import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/features/cartSlices';
import { removeDetails } from '../redux/features/orderSlices';
import { saveOrderSummary } from '../redux/features/summarySlices';

const OrderPlacement = () => {
  const order = useSelector((state) => state.order);
  const cartItems = useSelector((state) => state.cart);
  const mode = useSelector((state) => state.mode.mode);
  const summary = useSelector((state) => state.summary.orderDetails)

  const dispatch = useDispatch();
  const [showMsg, setShowMsg] = useState(true);

  const clearInfo = () => {
    // Create order summary
    const orderSummary = 
      {
        buyerName: order[0]?.name,
        buyerEmail: order[0]?.email,
        buyerAddress: order[0]?.address,
        buyerCity: order[0]?.city,
        products: cartItems,
      }
  

// Save order summary to Redux
dispatch(saveOrderSummary(orderSummary));

// Clear cart and order details
dispatch(clearCart());
dispatch(removeDetails());
setShowMsg(false);
  };

useEffect(() => {
  const timeOut = setTimeout(clearInfo, 3000);
  return () => clearTimeout(timeOut);
}, []);

if (!showMsg) {
  return (
    <div className={`mt-[70px] pt-[100px] flex justify-center items-center min-h-screen ${mode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="border px-6 py-10 rounded-lg shadow-md">
        <h1 className="text-blue-400 text-xl text-center font-semibold">Thank you for your order!</h1>
        <p className="text-center mt-4">Your order has been processed successfully.</p>
      </div>
    </div>
  );
}
console.log('Summary: ', summary);

return (
  <div className={`mt-[70px] pt-[100px] flex justify-center items-center min-h-screen ${mode ? 'bg-gray-900' : 'bg-gray-200'}`}>
    <div className={`border px-6 py-10 rounded-lg shadow-md ${mode && 'border-blue-400 shadow-blue-400'}`}>
      <h1 className="text-blue-400 text-xl text-center font-semibold">Your Order Has Been Submitted!</h1>
      <hr className="py-4" />
      <div>
        <h1 className="text-lg font-semibold">Order Details</h1>
        <hr className="py-3" />
        <div>
          <p className="font-mono font-semibold">Buyer Name: <span className="font-normal">{order[0]?.name}</span></p>
          <p className="font-mono font-semibold">Buyer Email: <span className="font-normal">{order[0]?.email}</span></p>
          <p className="font-mono font-semibold">Buyer Shipping Address: <span className="font-normal">{order[0]?.address}</span></p>
          <p className="font-mono font-semibold">Buyer City: <span className="font-normal">{order[0]?.city}</span></p>
          <h1 className="font-mono font-semibold">Selected Products:</h1>
          <span className="font-normal">
            {cartItems.map((item) => (
              <p key={item.id}>{item.qty} x {item.name}</p>
            ))}
          </span>
        </div>
      </div>
    </div>
  </div>
);
};

export default OrderPlacement;
