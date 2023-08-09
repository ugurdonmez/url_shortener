package com.example.demo.service;

import com.example.demo.exception.UrlNotFoundException;
import com.example.demo.model.Url;
import com.example.demo.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class UrlShortenerServiceImpl implements UrlShortenerService {

    @Autowired
    private HashService hashService;

    @Autowired
    private UrlService urlService;

    @Override
    public Optional<Url> createShortUrl(String originalUrl) {
        String hash = hashService.getHash(originalUrl).substring(0, 16);

        return Optional.of(
                Url.builder()
                        .originalUrl(originalUrl)
                        .shortUrl(hash)
                        .creationDate(LocalDateTime.now())
                        .build()
        );
    }

    @Override
    public Optional<Url> persistShortUrl(Url url) {
        return urlService.save(url);
    }

    @Override
    public Optional<Url> getEncodedUrl(String shortUrl) {
        return urlService.getUrlByShortUrl(shortUrl);
    }
}
