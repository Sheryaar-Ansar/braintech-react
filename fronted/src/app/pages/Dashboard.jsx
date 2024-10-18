import React from 'react'
import { useDispatch } from 'react-redux'
import { LogoutPage } from '../redux/features/loginSlices'

const Dashboard = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(LogoutPage())
    }
  return (
    <div className='mt-[70px] pt-[200px] pb-[200px]'>
      <h1>Welcome To the dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
