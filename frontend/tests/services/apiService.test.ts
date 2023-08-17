import axios from 'axios';
import * as apiService from '../../src/services/apiService';

// The type for the mocked axios response.
interface MockAxiosResponse {
    data: {
        originalUrl: string;
        shortUrl: string;
        creationDate: string;
    }
}

// Mocking the axios library.
jest.mock('axios', () => {
    const mAxios = {
        get: jest.fn(),
        post: jest.fn(),
        interceptors: {
            request: {
                use: jest.fn(),
                eject: jest.fn()
            },
            response: {
                use: jest.fn(),
                eject: jest.fn()
            }
        }
    };
    return {
        ...mAxios,
        create: jest.fn(() => mAxios),
    };
});

describe('apiService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('successfully shortens a URL', async () => {
        const mockResponse: MockAxiosResponse = {
            data: {
                originalUrl: "www.ea.com",
                shortUrl: "D2DBA55B35293A9D",
                creationDate: "2023-08-09T18:19:28.063734"
            }
        };

        (axios.create().post as jest.Mock).mockResolvedValue(mockResponse);

        let result;
        try {
            result = await apiService.shortenUrl('www.ea.com');
        } catch (error) {
            expect(error).toBeUndefined();
        }

        expect(result).toEqual(mockResponse);
    });
});
