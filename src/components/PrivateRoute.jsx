import React from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/auth'

export default function PrivateRoute({ children }) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}