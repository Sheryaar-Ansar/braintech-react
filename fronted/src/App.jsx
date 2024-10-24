import Navbar from './app/components/header/Navbar'
import { Routes, Route } from 'react-router-dom'
import Shop from './app/pages/Shop'
import { useSelector } from 'react-redux'
import './App.css'
import Home from './app/pages/Home'
import ProductDetail from './app/pages/ProductDetail'
import Checkout from './app/pages/Checkout'
import { Toaster } from 'react-hot-toast'
import OrderPlacement from './app/pages/OrderPlacement'
import Contact from './app/pages/Contact'
import Footer from './app/components/footer/Footer'
import { AuthContext } from './app/context/AuthContext'
import ProtectedRoute from './app/PrivateRoute/ProtectedRoute'
import Login from './app/pages/Login'
import Dashboard from './app/pages/Dashboard'
import Whatsapp from './app/components/Whatsapp'

function App() {
  const mode = useSelector((state) => state.mode.mode)
  const { isAuthenticated } = useSelector((state) => state.login)
  return (
    <div className={`${mode ? 'transition-all duration-500 bg-black text-white' : 'transition-all duration-500 bg-white text-black'}`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      {!isAuthenticated ?
        <>
          <Whatsapp />
          <AuthContext>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/shop/:id' element={<ProductDetail />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/proceed-to-checkout' element={<Checkout />} />
              <Route path='/order-placement' element=
                {<ProtectedRoute>
                  <OrderPlacement />
                </ProtectedRoute>} />
              <Route path='/hasnainweb' element={<Login />} />
            </Routes>
          </AuthContext>
        </>
        :
        <Dashboard />
      }

      <Footer />
    </div>
  )
}

export default App
