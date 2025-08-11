import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUsers, saveUsers, setCurrentUser } from '../utils/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const e = {}

    if (!form.firstName.trim()) e.firstName = 'First name is required'

    if (!form.email.trim()) {
      e.email = 'Email is required'
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(form.email.trim())) e.email = 'Please enter a valid email'
    }

    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters'

    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password'

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match'
    }

    if (form.phone && !/^[0-9()+\-\s]+$/.test(form.phone)) {
      e.phone = 'Please enter a valid phone number'
    }

    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
    setGeneralError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    setGeneralError('')

    const v = validate()
    if (Object.keys(v).length > 0) {
      setErrors(v)
      return
    }

    setSubmitting(true)

    try {
      const users = getUsers()
      const exists = users.find(u => u.email === form.email.toLowerCase().trim())

      if (exists) {
        setGeneralError('An account with that email already exists')
        setSubmitting(false)
        return
      }

      const newUser = {
        id: Date.now().toString(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      }

      users.push(newUser)
      saveUsers(users)

      // automatically sign in the new user
      setCurrentUser(newUser)

      // navigate to products
      navigate('/products')
    } catch (err) {
      console.error(err)
      setGeneralError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }
}