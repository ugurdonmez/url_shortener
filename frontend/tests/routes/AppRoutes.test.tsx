import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../src/routes/AppRoutes';

describe('<AppRoutes />', () => {

    const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);

        return render(ui, { wrapper: MemoryRouter });
    };

    it('renders UrlShortener component when on root path', () => {
        renderWithRouter(<AppRoutes />, { route: '/' });
        expect(screen.getByText('Shortener')).toBeInTheDocument();
    });

    it('renders UrlRedirector component when on path with a shortUrl', () => {
        renderWithRouter(<AppRoutes />, { route: '/exampleShortUrl' });
        expect(screen.getByText('Shortener')).toBeInTheDocument();
    });
});
