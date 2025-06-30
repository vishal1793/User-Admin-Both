import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
const ProtectedRouter = () => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/' />
    );
}

export default ProtectedRouter;
