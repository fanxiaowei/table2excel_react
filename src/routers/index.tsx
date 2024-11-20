
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/App';
import Login from '@pages/Login';
import Home from '@pages/Home';

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<App />} >
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
