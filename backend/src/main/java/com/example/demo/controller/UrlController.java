package com.example.demo.controller;

import com.example.demo.model.UrlRequestDTO;
import com.example.demo.model.UrlResponseDTO;
import com.example.demo.service.UrlService;
import com.example.demo.service.UrlShortenerService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Setter
@RestController
public class UrlController {

    @Autowired
    private UrlShortenerService urlShortenerService;

    @Autowired
    private UrlService urlService;

    @GetMapping("/ping")
    public String testController() {
        return "pong";
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@RequestBody UrlRequestDTO urlRequest) {
        var url = urlService.getUrlByOriginalUrl(urlRequest.getOriginalUrl());

        if (url.isPresent()) {
            UrlResponseDTO responseDTO = UrlResponseDTO.builder()
                    .originalUrl(url.get().getOriginalUrl())
                    .shortUrl(url.get().getShortUrl())
                    .creationDate(url.get().getCreationDate())
                    .build();

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

            return ResponseEntity.ok(responseDTO);
        }

        throw new RuntimeException("Unknown exception");
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<UrlResponseDTO> getOriginalUrl(@PathVariable String shortUrl) {
        var url = urlShortenerService.getEncodedUrl(shortUrl);

        UrlResponseDTO responseDTO = UrlResponseDTO.builder()
                .originalUrl(url.get().getOriginalUrl())
                .shortUrl(url.get().getShortUrl())
                .creationDate(url.get().getCreationDate())
                .build();

        return ResponseEntity.ok(responseDTO);
    }
}
