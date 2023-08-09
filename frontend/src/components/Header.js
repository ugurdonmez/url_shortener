import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
    return (
        <Box mt={10} mb={10}> {/* Add spacing to top and bottom */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography
                        variant="h4"
                        style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            width: '100%',
                            textAlign: 'center',
                            font: '900 49px asap,arial' // Added this line
                        }}>
                        URL Shortener
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

