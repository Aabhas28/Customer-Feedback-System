import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AverageRating = () => {
  const [productId, setProductId] = useState(''); // Product ID selected by user
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Dummy product list (replace with API call later)
  const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' },
  ];

  const fetchAverageRating = async () => {
    if (!productId) {
      toast.error("Please select a product to view the rating.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/feedback/product/rating/${productId}`);
      setAverageRating(response.data.averageRating);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching average rating:", error);
      toast.error("Failed to fetch rating.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAverageRating(); // Fetch rating whenever productId changes
    }
  }, [productId]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Average Rating</h2>

      {/* Product Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Select Product</label>
        <select 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="" disabled>Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Average Rating Display */}
      <div className="text-center">
        {loading ? (
          <p className="text-gray-500">Loading average rating...</p>
        ) : (
          <p className="text-xl font-semibold text-blue-600">Average Rating: {averageRating}</p>
        )}
      </div>
    </div>
  );
};

export default AverageRating;
