import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
    it('renders the <Header /> component', () => {
        render(<App />);

        expect(screen.getByRole('banner')).toBeInTheDocument(); // Assuming Header has a role of 'banner'
    });
});
