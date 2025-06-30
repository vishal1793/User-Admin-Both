import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import ProtectedRouter from './ProtectedRouter'
import User from '../Pages/User';
import Admin from '../Pages/Admin';
export const ContextApi = createContext(null)

const BaseRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("isAuthenticated") || false)
    const [visibleData, setVisibleData] = useState({
        visible: false,
        data: []
    })
    const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
    return (
        <>
            <BrowserRouter>
                <ContextApi.Provider value={{ isAuthenticated, setIsAuthenticated, visibleData, setVisibleData, userType, setUserType }}>
                    <Routes>
                        {
                            !isAuthenticated && <>
                                <Route path='/' element={<Login />} />
                                <Route path='/admin' element={<Navigate to='/' />} />
                                <Route path='/user' element={<Navigate to='/' />} />
                            </>
                        }
                        <Route element={<ProtectedRouter />}>
                            <Route path='/user' element={<Navigate to='/' />} />
                            <Route path='/admin' element={<Navigate to='/' />} />
                            {
                                userType !== 'Admin' ? (<>
                                    <Route path='/' element={<User />} />
                                    <Route path='/user' element={<Navigate to='/' />} />
                                    <Route path='/admin' element={<Navigate to='/' />} />
                                </>) : (<>
                                    <Route path='/' element={<Admin />} />
                                    <Route path='/user' element={<Navigate to='/' />} />
                                    <Route path='/admin' element={<Navigate to='/' />} />
                                </>)
                            }
                        </Route>
                    </Routes>
                </ContextApi.Provider>
            </BrowserRouter>
        </>
    );
}

export default BaseRouter;
