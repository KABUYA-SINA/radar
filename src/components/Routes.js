import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Loading from './Loader';

function Roads() {
    return (
        <AnimatePresence >
            <Suspense fallback={<div className='routes'><Loading /></div>}>
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    )
}

export default Roads;