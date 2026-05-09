import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import OtpVerify from './pages/OtpVerify'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otpverify' element={<OtpVerify/>}/>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
   </BrowserRouter>

  )
}

export default App
