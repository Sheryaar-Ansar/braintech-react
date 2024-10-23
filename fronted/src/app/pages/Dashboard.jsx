import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutPage } from '../redux/features/loginSlices'
import Orders from './Orders';
import AddItems from './AddItems';
import Items from './Items';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('additems');
  const mode = useSelector((state)=>state.mode.mode)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(LogoutPage())
  }
  const renderPage = () => {
    if(activePage == 'additems'){
      return <AddItems/>
    }
    if(activePage == 'items'){
      return <Items/>
    }
    if(activePage == 'orders'){
      return <Orders/>
    }
  };
  return (
    <div className={`mt-[70px] pt-[50px] pb-[200px] bg-gray-200 ${mode && 'bg-gray-900'}`}>
      <div className='flex justify-between'>
      <h1 className='text-xl font-bold uppercase text-blue-600 ml-10 '>Welcome To the dashboard Hasnain!</h1>
      <button onClick={handleLogout} className='w-[150px] h-[40px] bg-red-700 text-white'>Logout</button>
      </div>
      <div>
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <button
            className={`p-3 ${activePage === 'additems' ? 'bg-blue-500' : ''}`}
            onClick={() => setActivePage('additems')}
          >
            Add Item
          </button>
          <button
            className={`p-3 ${activePage === 'items' ? 'bg-blue-500' : ''} block`}
            onClick={() => setActivePage('items')}
          >
            Items
          </button>
          <button
            className={`p-3 ${activePage === 'orders' ? 'bg-blue-500' : ''} block`}
            onClick={() => setActivePage('orders')}
          >
            Orders
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 bg-gray-200 p-6 ${mode && 'bg-gray-700'}`}>
        {renderPage()}
      </div>
    </div>

      </div>
    </div>
  )
}

export default Dashboard
