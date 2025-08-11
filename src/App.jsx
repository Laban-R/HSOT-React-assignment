import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Products from './pages/Products'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected products route */}
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<h2 style={{padding:20}}>Page not found</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}