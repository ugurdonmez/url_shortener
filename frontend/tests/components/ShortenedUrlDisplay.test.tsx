import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShortenedUrlDisplay from '../../src/components/ShortenedUrlDisplay';

// Mock the necessary imports/functions.
jest.mock('../../src/services/apiService', () => ({
    shortenUrl: jest.fn()
}));

const shortenUrl = require('../../src/services/apiService').shortenUrl;

describe('<ShortenedUrlDisplay />', () => {
    Object.defineProperty(global.navigator, 'clipboard', {
        value: {
            writeText: jest.fn(),
        },
        writable: true,
        configurable: true
    });

    beforeEach(() => {
        (shortenUrl as jest.Mock).mockClear();
    });

    const mockShortUrl = 'shorty123';
    const fullShortUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/${mockShortUrl}`;

    it('displays the shortened URL correctly when provided', () => {
        render(<ShortenedUrlDisplay shortUrl={mockShortUrl} />);

        const displayedUrl = screen.getByDisplayValue(fullShortUrl) as HTMLInputElement;
        expect(displayedUrl.value).toBe(fullShortUrl);
    });

    it('does not render the component when shortUrl is not provided', () => {
        const { container } = render(<ShortenedUrlDisplay shortUrl="" />);
        expect(container.firstChild).toBeNull();
    });

    it('provides a "Copy URL" button', () => {
        render(<ShortenedUrlDisplay shortUrl={mockShortUrl} />);

        const copyButton = screen.getByText('Copy URL');
        expect(copyButton).toBeInTheDocument();
    });
});
