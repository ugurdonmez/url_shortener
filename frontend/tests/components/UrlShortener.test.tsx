import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UrlShortener from '../../src/components/UrlShortener';

const mockStore = configureMockStore();

describe('<UrlShortener />', () => {
    let store: any;
    const initialState = {
        urlData: {
            shortUrl: null,
            longUrl: null,
            loading: false,
            error: null
        }
    };

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();

        // render(
        //     <Provider store={store}>
        //         <UrlShortener />
        //     </Provider>
        // );
    });

    it('renders without crashing', () => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('displays the error from the store when there is an error', () => {
        store = mockStore({
            ...initialState,
            urlData: {
                ...initialState.urlData,
                error: 'Some error occurred'
            }
        });

        render(
            <Provider store={store}>
                <UrlShortener />
            </Provider>
        );

        expect(screen.getByRole('alert')).toHaveTextContent('Some error occurred');
    });

});
