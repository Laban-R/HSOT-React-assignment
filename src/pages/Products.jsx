import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "Chocolate Cake",
    image: "https://via.placeholder.com/150",
    description: "Delicious chocolate cake with rich cream.",
    price: 25,
    category: "Cakes",
  },
  {
    id: 2,
    name: "Vanilla Cupcakes",
    image: "https://via.placeholder.com/150",
    description: "Soft vanilla cupcakes with buttercream frosting.",
    price: 15,
    category: "Cupcakes",
  },
  {
    id: 3,
    name: "Strawberry Tart",
    image: "https://via.placeholder.com/150",
    description: "Fresh strawberry tart with creamy filling.",
    price: 18,
    category: "Tarts",
  },
  {
    id: 4,
    name: "Wedding Cake",
    image: "https://via.placeholder.com/150",
    description: "Elegant 3-tier wedding cake with custom design.",
    price: 150,
    category: "Cakes",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(sampleProducts);

  // Access control — redirect if not logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [navigate]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", ...new Set(sampleProducts.map((p) => p.category))];

  return (
    <div className="products-page" style={{ padding: "20px" }}>
      <h1>Our Products</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "8px",
          margin: "10px 0",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {/* Category filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          display: "block",
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Product list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>${product.price}</strong>
              </p>
              <p style={{ fontStyle: "italic" }}>{product.category}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products