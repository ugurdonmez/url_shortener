import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // <-- Use this
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import AppRoutes from '../../src/routes/AppRoutes';
import { AnyAction } from "redux";

const mockStore = configureMockStore<unknown, AnyAction>();
let store: MockStoreEnhanced<unknown, AnyAction>;

describe('<AppRoutes />', () => {

    beforeEach(() => {
        store = mockStore({
            urlData: {
                shortUrl: '',
                longUrl: '',
                loading: false,
                error: null
            }
        });
        jest.spyOn(store, 'dispatch');
    });

    it('renders components for root path', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>  {/* <-- Use MemoryRouter */}
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );
    });
});
