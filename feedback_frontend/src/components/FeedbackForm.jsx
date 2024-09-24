import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
      { id: 3, name: 'Product C' },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedProduct || !rating || !comment) {
      toast.error("Please fill all fields.");
      return;
    }
  
    const payload = {
      productId: selectedProduct,
      rating,
      comment
    };
  
    setLoading(true);
  
    try {
      // Retrieve token from localStorage
      const token = JSON.parse(localStorage.getItem('token'));
      
      if (!token) {
        toast.error("User not authenticated. Please login.");
        setLoading(false);
        return;
      }
  
      // Send feedback submission request
      const response = await axios.post('http://localhost:3000/feedback/submit', payload, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in Authorization header
        },
      });
  
      toast.success("Feedback submitted successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to submit feedback.");
      console.error("Error submitting feedback:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product</label>
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)} 
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

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 h-24"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;