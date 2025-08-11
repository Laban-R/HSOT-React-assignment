import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../utils/auth'

export default function Header() {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="logo">My Store</h1>

        <nav>
          <ul className="nav-list">
            {!currentUser && (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
              </>
            )}

            <li><a href="/products">Products</a></li>

            {currentUser && (
              <>
                <li className="username">Hi, {currentUser.firstName}</li>
                <li>
                  <button className="btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}