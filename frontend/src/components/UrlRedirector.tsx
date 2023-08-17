import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLongUrl } from '../reducers/urlDataSlice';
import { RootState, AppDispatch } from '../store';

type ParamsType = {
    shortUrl: string;
};

const UrlRedirector: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { shortUrl } = useParams<ParamsType>();
    const error = useSelector((state: RootState) => state.urlData.error);
    const longUrl = useSelector((state: RootState) => state.urlData.longUrl);

    useEffect(() => {
        if (shortUrl) {
            dispatch(fetchLongUrl(shortUrl));
        }
    }, [shortUrl, dispatch]);

    useEffect(() => {
        if (longUrl) {
            // Redirect to the original URL
            window.location.href = longUrl.startsWith('http://') || longUrl.startsWith('https://')
                ? longUrl
                : `http://${longUrl}`;
        }
    }, [longUrl]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    );
};

export default UrlRedirector;
