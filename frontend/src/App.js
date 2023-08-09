import React from 'react';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import UrlShortener from './components/UrlShortener';
import Header from './components/Header';
import UrlRedirector from './components/UrlRedirector';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const theme = createTheme({
    palette: {
        background: {
            default: "#f9f9f9"
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header />
                <Container component="main">
                    <CssBaseline />
                    <Routes>
                        <Route path="/:shortUrl" element={<UrlRedirector />} />
                        <Route path="/" element={<UrlShortener />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;
