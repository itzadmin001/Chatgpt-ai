import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import socket from '../Socket'
import { loginSuccess, logout } from './store/authSlice'


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    socket.emit("verify-user");
    socket.on("verify-response", (data) => {
      if (data) {
        dispatch(loginSuccess(data))
      } else {
        dispatch(logout())
      }
    });

    return () => {
      socket.off("verify-response");
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App