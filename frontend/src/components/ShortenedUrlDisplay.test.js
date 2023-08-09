import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShortenedUrlDisplay from './ShortenedUrlDisplay';

describe('<ShortenedUrlDisplay />', () => {
    // Mock the clipboard API
    global.navigator.clipboard = {
        writeText: jest.fn(),
    };

    const mockShortUrl = 'shorty123';
    const fullShortUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/${mockShortUrl}`;

    it('displays the shortened URL correctly when provided', () => {
        render(<ShortenedUrlDisplay shortUrl={mockShortUrl} />);

        const displayedUrl = screen.getByDisplayValue(fullShortUrl);
        expect(displayedUrl).toBeInTheDocument();
    });

    it('does not render the component when shortUrl is not provided', () => {
        const { container } = render(<ShortenedUrlDisplay />);
        expect(container.firstChild).toBeNull();
    });

    it('provides a "Copy URL" button', () => {
        render(<ShortenedUrlDisplay shortUrl={mockShortUrl} />);

        const copyButton = screen.getByText('Copy URL');
        expect(copyButton).toBeInTheDocument();
    });
});
