package com.example.demo.controller;

import com.example.demo.model.UrlRequestDTO;
import com.example.demo.model.UrlResponseDTO;
import com.example.demo.service.UrlService;
import com.example.demo.service.UrlShortenerService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Setter
@RestController
public class UrlController {

    private static final Logger logger = LoggerFactory.getLogger(UrlController.class);

    @Autowired
    private UrlShortenerService urlShortenerService;

    @Autowired
    private UrlService urlService;

    @GetMapping("/ping")
    public String testController() {
        logger.info("Ping endpoint hit");
        return "pong";
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@RequestBody UrlRequestDTO urlRequest) {

        logger.info("Attempting to shorten URL: {}", urlRequest.getOriginalUrl());

        var url = urlService.getUrlByOriginalUrl(urlRequest.getOriginalUrl());

        if (url.isPresent()) {
            UrlResponseDTO responseDTO = UrlResponseDTO.builder()
                    .originalUrl(url.get().getOriginalUrl())
                    .shortUrl(url.get().getShortUrl())
                    .creationDate(url.get().getCreationDate())
                    .build();

            logger.info("URL find in DB: {} {}", urlRequest.getOriginalUrl(), url.get().getShortUrl());

            return ResponseEntity.ok(responseDTO);
        }

        var shortUrl = urlShortenerService.createShortUrl(urlRequest.getOriginalUrl());

        if (shortUrl.isPresent()) {
            var persistedUrl = urlShortenerService.persistShortUrl(shortUrl.get());
            UrlResponseDTO responseDTO = UrlResponseDTO.builder()
                    .originalUrl(persistedUrl.get().getOriginalUrl())
                    .shortUrl(persistedUrl.get().getShortUrl())
                    .creationDate(persistedUrl.get().getCreationDate())
                    .build();

            logger.info("URL shortened: {} {}", urlRequest.getOriginalUrl(), url.get().getShortUrl());

            return ResponseEntity.ok(responseDTO);
        }

        logger.error("Error while Attempting to shorten URL: {}", urlRequest.getOriginalUrl());

        throw new RuntimeException("Unknown exception");
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<UrlResponseDTO> getOriginalUrl(@PathVariable String shortUrl) {

        logger.info("Received request to fetch the original URL for short URL: {}", shortUrl);

        var url = urlShortenerService.getEncodedUrl(shortUrl);

        UrlResponseDTO responseDTO = UrlResponseDTO.builder()
                .originalUrl(url.get().getOriginalUrl())
                .shortUrl(url.get().getShortUrl())
                .creationDate(url.get().getCreationDate())
                .build();

        logger.info("Successfully retrieved original URL: {} for short URL: {}", responseDTO.getOriginalUrl(), shortUrl);

        return ResponseEntity.ok(responseDTO);
    }
}
