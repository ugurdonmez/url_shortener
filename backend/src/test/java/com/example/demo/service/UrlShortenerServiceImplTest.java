package com.example.demo.service;

import com.example.demo.model.Url;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UrlShortenerServiceImplTest {

    @Mock
    private HashService hashService;

    @Mock
    private UrlService urlService;

    @InjectMocks
    private UrlShortenerServiceImpl urlShortenerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateShortUrl() {
        String originalUrl = "http://example.com";
        String hashValue = "abcdefabcdefabcd";

        when(hashService.getHash(originalUrl)).thenReturn(hashValue + "extra");

        Optional<Url> result = urlShortenerService.createShortUrl(originalUrl);

        assertTrue(result.isPresent());
        assertEquals(originalUrl, result.get().getOriginalUrl());
        assertEquals(hashValue, result.get().getShortUrl());
    }

    @Test
    void testPersistShortUrl() {
        Url mockUrl = new Url();

        when(urlService.save(mockUrl)).thenReturn(Optional.of(mockUrl));

        Optional<Url> result = urlShortenerService.persistShortUrl(mockUrl);

        assertTrue(result.isPresent());
    }

    @Test
    void testGetEncodedUrl() {
        String shortUrl = "abcdefabcdefabcd";
        Url mockUrl = new Url();
        mockUrl.setShortUrl(shortUrl);

        when(urlService.getUrlByShortUrl(shortUrl)).thenReturn(Optional.of(mockUrl));

        Optional<Url> result = urlShortenerService.getEncodedUrl(shortUrl);

        assertTrue(result.isPresent());
        assertEquals(shortUrl, result.get().getShortUrl());
    }
}
