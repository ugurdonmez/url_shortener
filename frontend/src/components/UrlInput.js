import React, { useState } from 'react';
import { TextField, Box, Button, Grid, Typography } from '@mui/material';

const isValidURL = (str) => {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;
    }
};


const UrlInput = ({ value, onChange, handleSubmit }) => {

    const [error, setError] = useState(null);

    const handleValidationAndSubmit = () => {
        if (!isValidURL(value)) {
            setError("Please enter a valid URL.");
            return;
        }
        setError(null);  // reset the error state if the URL is valid
        handleSubmit();
    };

    return (
        <Box p={4} sx={{
            width: 758,
            height: 258,
            backgroundColor: '#fff',
            boxShadow: '0 1px 4px #ccc',
        }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        Paste the URL to be shortened
                    </Typography>
                </Grid>

                <Grid py={2} item xs={10}>
                    <TextField
                        label="Enter the link here"
                        fullWidth
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={Boolean(error)}
                        helperText={error}
                    />
                </Grid>

                <Grid py={2} item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleValidationAndSubmit}
                        sx={{ height: '56px' }}>
                        Shorten
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography align="center">
                        ShortURL is a free tool to shorten URLs and generate short links
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography align="center">
                        URL shortener allows to create a shortened link making it easy to share
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UrlInput;
