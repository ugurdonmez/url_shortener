import React, { useState, useEffect } from 'react';
import UrlInput from './UrlInput';
import ShortenedUrlDisplay from './ShortenedUrlDisplay';
import { Box, Alert } from '@mui/material';
import { shortenUrl } from '../services/apiService';  // adjust the path as needed

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(null);
    const [showErrorTimeout, setShowErrorTimeout] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await shortenUrl(longUrl);

            if (response.data) {
                setShortUrl(response.data.shortUrl);
            }

            setError(null);
            if (showErrorTimeout) clearTimeout(showErrorTimeout);

        } catch (errorMessage) {
            setError(errorMessage);
            const timeout = setTimeout(() => {
                setError(null);
            }, 5000);
            setShowErrorTimeout(timeout);
        }
    };

    useEffect(() => {
        return () => {
            if (showErrorTimeout) clearTimeout(showErrorTimeout);
        };
    }, [showErrorTimeout]);

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
                <UrlInput value={longUrl} onChange={e => setLongUrl(e.target.value)} handleSubmit={handleSubmit} />
                <ShortenedUrlDisplay shortUrl={shortUrl} />
            </Box>
        </>
    );
}

export default UrlShortener;
