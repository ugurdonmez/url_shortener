import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Alert} from '@mui/material';
import { getLongUrl } from '../services/apiService';

const UrlRedirector = () => {
    const { shortUrl } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLongUrlAndRedirect = async () => {
            try {
                const response = await getLongUrl(shortUrl);

                if (response.data && response.data.originalUrl) {
                    // Redirect to the original URL
                    const originalUrl = response.data.originalUrl;
                    window.location.href = originalUrl.startsWith('http://') || originalUrl.startsWith('https://')
                        ? originalUrl
                        : `http://${originalUrl}`;
                } else {
                    console.log(response)
                    setError('Unexpected error occurred. Please try again.');
                }
            } catch (errorMessage) {
                console.error('Error fetching the long URL:', errorMessage);
                setError(errorMessage);
            }
        };

        getLongUrlAndRedirect();
    }, [shortUrl]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
};

export default UrlRedirector;
