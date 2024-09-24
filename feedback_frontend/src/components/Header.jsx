import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Check if the user is logged in by checking for a token
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <nav className="flex items-center space-x-4">
                    <Link to="/" className="text-blue-500 font-bold text-lg hover:text-blue-400">
                        Customer Feedback App
                    </Link>
                    <div className="flex space-x-8">
                        <Link to="/" className="hover:text-gray-300 ml-48">
                            Feedback History
                        </Link>
                        <Link to="/avg" className="hover:text-gray-300">
                            Average Rating
                        </Link>
                        <Link to="/feedback" className="hover:text-gray-300">
                            Feedback
                        </Link>
                        {/* Conditionally render Login and Register links */}
                        {!isLoggedIn && (
                            <>
                                <Link to="/login" className="hover:text-gray-300">
                                    Login
                                </Link>
                                <Link to="/register" className="hover:text-gray-300">
                                    Register
                                </Link>
                            </>
                        )}
                        {/* Conditionally render Log Out button */}
                       
                    </div>
                    <div className='pl-[300px]'>
                    {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded "
                            >
                                Log Out
                            </button>
                        )}
                        </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;