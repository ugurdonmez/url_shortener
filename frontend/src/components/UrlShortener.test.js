import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { shortenUrl } from '../services/apiService';
import UrlShortener from './UrlShortener';

jest.mock('../services/apiService');

describe('<UrlShortener />', () => {

    beforeEach(() => {
        shortenUrl.mockClear();
    });

    it('renders without crashing', () => {
        render(<UrlShortener />);
        expect(screen.getByLabelText('Enter the link here')).toBeInTheDocument();
        expect(screen.getByText('Shorten')).toBeInTheDocument();
    });

    it('updates the input value on change', () => {
        render(<UrlShortener />);
        const input = screen.getByLabelText('Enter the link here');

        fireEvent.change(input, { target: { value: 'https://www.example.com' } });
        expect(input.value).toBe('https://www.example.com');
    });

});
