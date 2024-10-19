import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LogoutPage } from '../redux/features/loginSlices'
import Orders from './Orders';
import AddItems from './AddItems';
import Items from './Items';

const Dashboard = () => {
  const [activePage, setActivePage] = useState(false);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(LogoutPage())
  }
  const renderPage = () => {
    if(!activePage){
      return <AddItems/>
    }else{
      return <Items/>
    }
  };
  return (
    <div className='mt-[70px] pt-[50px] pb-[200px] bg-gray-200'>
      <div className='flex justify-between'>
      <h1 className='text-xl font-bold uppercase text-blue-600'>Welcome To the dashboard Hasnain!</h1>
      <button onClick={handleLogout} className='w-[150px] h-[40px] bg-red-700 text-white'>Logout</button>
      </div>
      <div>
      <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <button
            className={`p-3 ${activePage === false ? 'bg-blue-500' : ''}`}
            onClick={() => setActivePage(false)}
          >
            Add Item
          </button>
          <button
            className={`p-3 ${activePage === true ? 'bg-blue-500' : ''} block`}
            onClick={() => setActivePage(true)}
          >
            Items
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {renderPage()}
      </div>
    </div>

      </div>
    </div>
  )
}

export default Dashboard
