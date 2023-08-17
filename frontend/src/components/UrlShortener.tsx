import React, { useState, ChangeEvent } from 'react';
import UrlInput from './UrlInput';
import ShortenedUrlDisplay from './ShortenedUrlDisplay';
import { Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShortenedUrl } from '../reducers/urlDataSlice';
import { AppDispatch, RootState } from '../store';

const UrlShortener: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const shortUrl = useSelector((state: RootState) => state.urlData.shortUrl);
    const error = useSelector((state: RootState) => state.urlData.error);
    const [longUrl, setLongUrl] = useState<string>('');

    const handleSubmit = () => {
        dispatch(fetchShortenedUrl(longUrl));
    };

    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">
                <UrlInput value={longUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => setLongUrl(e.target.value)} handleSubmit={handleSubmit} />
                <ShortenedUrlDisplay shortUrl={shortUrl || ''} />
            </Box>
        </>
    );
}

export default UrlShortener;
