import React from 'react';
import UrlShortener from '../components/UrlShortener';
import UrlRedirector from '../components/UrlRedirector';
import { Route, Routes } from 'react-router-dom';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/:shortUrl" element={<UrlRedirector />} />
            <Route path="/" element={<UrlShortener />} />
        </Routes>
    );
}

export default AppRoutes;
