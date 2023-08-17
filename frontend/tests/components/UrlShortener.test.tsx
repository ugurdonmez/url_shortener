import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { shortenUrl } from '../../src/services/apiService';
import UrlShortener from '../../src/components/UrlShortener';

jest.mock('../../src/services/apiService');

describe('<UrlShortener />', () => {

    // Cast shortenUrl as mocked function for jest
    const mockShortenUrl = shortenUrl as jest.MockedFunction<typeof shortenUrl>;

    beforeEach(() => {
        mockShortenUrl.mockClear();
    });

    it('renders without crashing', () => {
        render(<UrlShortener />);
        expect(screen.getByLabelText('Enter the link here')).toBeInTheDocument();
        expect(screen.getByText('Shorten')).toBeInTheDocument();
    });

    it('updates the input value on change', () => {
        render(<UrlShortener />);
        const input = screen.getByLabelText('Enter the link here') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'https://www.example.com' } });
        expect(input.value).toBe('https://www.example.com');
    });

});
