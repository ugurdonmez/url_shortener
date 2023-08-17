import { configureStore } from '@reduxjs/toolkit';
import urlDataReducer from './reducers/urlDataSlice';

const store = configureStore({
    reducer: {
        urlData: urlDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
