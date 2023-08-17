import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';

describe('<Header />', () => {
    it('renders the app title correctly', () => {
        render(<Header />);

        expect(screen.getByText('URL Shortener')).toBeInTheDocument();

        const titleElement = screen.getByText('URL Shortener');
        expect(titleElement).toHaveStyle('color: blue');
    });
});
