package com.example.demo.controller;

import com.example.demo.model.Url;
import com.example.demo.model.UrlRequestDTO;
import com.example.demo.model.UrlResponseDTO;
import com.example.demo.service.UrlService;
import com.example.demo.service.UrlShortenerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UrlControllerTest {

    @InjectMocks
    private UrlController urlController;

    @Mock
    private UrlService urlService;

    @Mock
    private UrlShortenerService urlShortenerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testShortenUrlReturnsExistingUrl() {
        UrlRequestDTO request = new UrlRequestDTO();
        request.setOriginalUrl("http://www.example.com");

        Url url = new Url(1L, "http://www.example.com", "abc123", LocalDateTime.now());

        when(urlService.getUrlByOriginalUrl(anyString())).thenReturn(Optional.of(url));

        ResponseEntity<?> response = urlController.shortenUrl(request);
        UrlResponseDTO responseDTO = (UrlResponseDTO) response.getBody();

        assertEquals("http://www.example.com", responseDTO.getOriginalUrl());
        assertEquals("abc123", responseDTO.getShortUrl());
    }

    @Test
    public void testShortenUrlCreatesNewShortenedUrl() {
        UrlRequestDTO request = new UrlRequestDTO();
        request.setOriginalUrl("http://www.example.com");

        Url url = new Url(1L, "http://www.example.com", "def456", LocalDateTime.now());

        when(urlService.getUrlByOriginalUrl(anyString())).thenReturn(Optional.empty());
        when(urlShortenerService.createShortUrl(anyString())).thenReturn(Optional.of(url));
        when(urlShortenerService.persistShortUrl(any(Url.class))).thenReturn(Optional.of(url));

        ResponseEntity<?> response = urlController.shortenUrl(request);
        UrlResponseDTO responseDTO = (UrlResponseDTO) response.getBody();

        assertEquals("http://www.example.com", responseDTO.getOriginalUrl());
        assertEquals("def456", responseDTO.getShortUrl());
    }

    @Test
    public void testGetOriginalUrl() {
        String shortUrl = "abc123";
        Url url = new Url(1L, "http://www.example.com", "abc123", LocalDateTime.now());

        when(urlShortenerService.getEncodedUrl(anyString())).thenReturn(Optional.of(url));

        ResponseEntity<UrlResponseDTO> response = urlController.getOriginalUrl(shortUrl);

        assertEquals("http://www.example.com", response.getBody().getOriginalUrl());
        assertEquals("abc123", response.getBody().getShortUrl());
    }

    // Additional tests can be added, such as for the "pong" endpoint and error cases.
}
