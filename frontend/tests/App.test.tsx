import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/store';
import App from '../src/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('App component', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });
});
