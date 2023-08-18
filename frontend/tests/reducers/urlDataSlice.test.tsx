import reducer, { fetchShortenedUrl, fetchLongUrl } from '../../src/reducers/urlDataSlice';

// Test the initial state
describe('urlData reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({
            shortUrl: null,
            longUrl: null,
            loading: false,
            error: null,
        });
    });

    describe('fetchShortenedUrl', () => {
        it('should handle pending', () => {
            const action = { type: fetchShortenedUrl.pending.type };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(true);
            expect(state.error).toBe(null);
        });

        it('should handle fulfilled', () => {
            const testShortUrl = 'shortenedUrlExample';
            const action = { type: fetchShortenedUrl.fulfilled.type, payload: testShortUrl };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(false);
            expect(state.shortUrl).toBe(testShortUrl);
            expect(state.error).toBe(null);
        });

        it('should handle rejected with custom message', () => {
            const errorPayload = { message: 'Custom error message' };
            const action = { type: fetchShortenedUrl.rejected.type, payload: errorPayload, error: {} as any };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe(errorPayload.message);
        });

        it('should handle rejected without custom message', () => {
            const errorMessage = 'Error message';
            const action = { type: fetchShortenedUrl.rejected.type, error: { message: errorMessage } as any };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe(errorMessage);
        });
    });

    describe('fetchLongUrl', () => {
        it('should handle pending', () => {
            const action = { type: fetchLongUrl.pending.type };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(true);
            expect(state.error).toBe(null);
        });

        it('should handle fulfilled', () => {
            const testLongUrl = 'originalUrlExample';
            const action = { type: fetchLongUrl.fulfilled.type, payload: testLongUrl };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(false);
            expect(state.longUrl).toBe(testLongUrl);
            expect(state.error).toBe(null);
        });

        it('should handle rejected with custom message', () => {
            const errorPayload = { message: 'Custom error message for longUrl' };
            const action = { type: fetchLongUrl.rejected.type, payload: errorPayload, error: {} as any };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe(errorPayload.message);
        });

        it('should handle rejected without custom message', () => {
            const errorMessage = 'Error message for longUrl';
            const action = { type: fetchLongUrl.rejected.type, error: { message: errorMessage } as any };
            const state = reducer(undefined, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe(errorMessage);
        });
    });
});
