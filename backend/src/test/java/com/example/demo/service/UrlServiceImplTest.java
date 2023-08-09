package com.example.demo.service;

import com.example.demo.exception.DatabaseWriteException;
import com.example.demo.model.Url;
import com.example.demo.repository.UrlRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UrlServiceImplTest {

    @Mock
    private UrlRepository urlRepository;

    @InjectMocks
    private UrlServiceImpl urlService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUrlByShortUrl_found() {
        Url mockUrl = new Url();
        mockUrl.setShortUrl("short");
        when(urlRepository.findByShortUrl("short")).thenReturn(Optional.of(mockUrl));

        Optional<Url> result = urlService.getUrlByShortUrl("short");

        assertTrue(result.isPresent());
        assertEquals("short", result.get().getShortUrl());
    }

    @Test
    void testGetUrlByShortUrl_notFound() {
        when(urlRepository.findByShortUrl("short")).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> urlService.getUrlByShortUrl("short"));
    }

    @Test
    void testGetUrlByOriginalUrl_found() {
        Url mockUrl = new Url();
        mockUrl.setOriginalUrl("original");
        when(urlRepository.findByOriginalUrl("original")).thenReturn(Optional.of(mockUrl));

        Optional<Url> result = urlService.getUrlByOriginalUrl("original");

        assertTrue(result.isPresent());
        assertEquals("original", result.get().getOriginalUrl());
    }

    @Test
    void testGetUrlByOriginalUrl_notFound() {
        when(urlRepository.findByOriginalUrl("original")).thenReturn(Optional.empty());

        Optional<Url> result = urlService.getUrlByOriginalUrl("original");

        assertTrue(result.isEmpty());
    }

    @Test
    void testSave_success() {
        Url mockUrl = new Url();
        when(urlRepository.save(mockUrl)).thenReturn(mockUrl);

        Optional<Url> result = urlService.save(mockUrl);

        assertTrue(result.isPresent());
    }
}
