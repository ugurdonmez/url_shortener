import React from 'react';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createTheme({
    palette: {
        background: {
            default: "#f9f9f9"
        }
    }
});

const App: React.FC = () => {
    return (
        <Provider store={store}> {}
            <ThemeProvider theme={theme}>
                <Router>
                    <Header />
                    <Container component="main">
                        <CssBaseline />
                        <AppRoutes />
                    </Container>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
