import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UrlRedirector from '../../src/components/UrlRedirector';
import {MemoryRouter, Route, Routes} from 'react-router-dom';

const mockStore = configureMockStore();

describe('UrlRedirector component', () => {
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

    });

    it('dispatches fetchLongUrl action when component is mounted', () => {
        const testShortUrl = 'someShortUrl';

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/r/${testShortUrl}`]}>
                    <Routes>
                        <Route path="/r/:shortUrl" element={<UrlRedirector />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
