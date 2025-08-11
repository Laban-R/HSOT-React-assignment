import React from 'react'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="category">{product.category}</span>
        </div>
      </div>
    </div>
  )
}