import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Display from './Display'

const Assembly = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Display />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Assembly;