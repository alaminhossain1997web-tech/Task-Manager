import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Registration from './pages/Registration'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
   </BrowserRouter>

  )
}

export default App
