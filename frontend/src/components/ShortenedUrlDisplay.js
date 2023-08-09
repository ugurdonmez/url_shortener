import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

const ShortenedUrlDisplay = ({ shortUrl }) => {

    const fullShortUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/${shortUrl}`;

    const handleCopyClick = () => {
        copyToClipboard(fullShortUrl);
    };

    return (
        shortUrl &&
        <Box p={4}
             m={4}
             sx={{
            width: 758,
            height: 200,
            backgroundColor: '#fff',
            boxShadow: '0 1px 4px #ccc',
        }}>

            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" align="left">
                        Your shortened URL
                    </Typography>
                </Grid>

                <Grid py={2} item xs={10}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={fullShortUrl}
                        inputProps={
                            { readOnly: true, }
                        }
                    />
                </Grid>

                <Grid py={2} item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCopyClick}
                        sx={{ height: '100%' }}>
                        Copy URL
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShortenedUrlDisplay;
