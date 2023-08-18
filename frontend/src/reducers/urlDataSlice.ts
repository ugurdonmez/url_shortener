import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { shortenUrl, getLongUrl } from '../services/apiService';

interface UrlState {
    shortUrl: string | null;
    longUrl: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UrlState = {
    shortUrl: null,
    longUrl: null,
    loading: false,
    error: null
};

// Async thunk for shortening the URL
export const fetchShortenedUrl = createAsyncThunk('urlData/fetchShortenedUrl', async (longUrl: string) => {
    const response = await shortenUrl(longUrl);
    return response.data.shortUrl;
});

// Async thunk for fetching the long URL from the short URL
export const fetchLongUrl = createAsyncThunk('urlData/fetchLongUrl', async (shortUrl: string) => {
    const response = await getLongUrl(shortUrl);
    return response.data.originalUrl;
});

const urlDataSlice = createSlice({
    name: 'urlData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShortenedUrl.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShortenedUrl.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.shortUrl = action.payload;
                state.error = null;
            })
            .addCase(fetchShortenedUrl.rejected, (state, action) => {
                state.loading = false;
                if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
                    state.error = (action.payload as { message: string }).message;
                } else if (action.error.message) {
                    state.error = action.error.message;
                }
            })

            // Handling fetchLongUrl actions
            .addCase(fetchLongUrl.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLongUrl.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.longUrl = action.payload;
                state.error = null;
            })
            .addCase(fetchLongUrl.rejected, (state, action) => {
                state.loading = false;
                if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
                    state.error = (action.payload as { message: string }).message;
                } else if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default urlDataSlice.reducer;
