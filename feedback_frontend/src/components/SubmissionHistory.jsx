import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { products } from '../data/products'; // Import product data

const SubmissionHistory = () => {
    const [productId, setProductId] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

     // Function to fetch feedback data

    const fetchFeedbacks = async () => {
        if (!productId) {
            toast.error("Please select a product to view feedback.");
            return;
        }

        setLoading(true);
        try {
            // Make a GET request to fetch feedback data for the selected product
            const response = await axios.get(`http://localhost:3000/feedback/product/${productId}?page=${page}&limit=5`);
            setFeedbacks(response.data.feedbacks);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching feedback:", error);
            toast.error("Failed to fetch feedback.");
            setLoading(false);
        }
    };
  // Effect to fetch feedback data when productId or page changes
    useEffect(() => {
        if (productId) {
            fetchFeedbacks();
        }
    }, [productId, page]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Feedback History</h2>

            {/* Product Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Product</label>
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

            {/* Feedback List */}
            <div className="feedback-list">
                {loading ? (
                    <p className="text-center">Loading feedback...</p>
                ) : feedbacks.length > 0 ? (
                    <ul className="space-y-4">
                        {feedbacks.map((feedback) => (
                            <li key={feedback._id} className="bg-gray-100 p-4 rounded-md">
                                <p><strong>User:</strong> {feedback.user.name}</p>
                                <p><strong>Rating:</strong> {feedback.rating}</p>
                                <p><strong>Comment:</strong> {feedback.comment}</p>
                                <p><small><strong>Date:</strong> {new Date(feedback.createdAt).toLocaleDateString()}</small></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No feedback available for this product.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls flex justify-center space-x-4 mt-4">
                    <button 
                        disabled={page === 1} 
                        onClick={() => setPage(page - 1)}
                        className={`px-4 py-2 rounded-md transition-colors ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {page} of {totalPages}</span>
                    <button 
                        disabled={page === totalPages} 
                        onClick={() => setPage(page + 1)}
                        className={`px-4 py-2 rounded-md transition-colors ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubmissionHistory;