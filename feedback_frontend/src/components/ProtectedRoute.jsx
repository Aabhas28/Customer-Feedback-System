import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Login from './Login';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // If the token exists, render the child routes using Outlet
    // If the token does not exist, redirect to the login page
    return token ? <Outlet /> : <Navigate to="login" />
}

export default ProtectedRoute