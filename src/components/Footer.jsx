import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>
      </div>
    </footer>
  )
}
