// small helper utilities for auth-localStorage handling
export function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]')
}
export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}
export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null')
}
export function logout() {
  localStorage.removeItem('currentUser')
}