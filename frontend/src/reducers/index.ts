import { combineReducers } from '@reduxjs/toolkit';
import urlDataReducer from './urlDataSlice';

const rootReducer = combineReducers({
    urlData: urlDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
