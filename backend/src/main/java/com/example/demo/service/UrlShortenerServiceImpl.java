package com.example.demo.service;

import com.example.demo.model.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class UrlShortenerServiceImpl implements UrlShortenerService {

    private static final Logger logger = LoggerFactory.getLogger(UrlShortenerServiceImpl.class);

    @Autowired
    private HashService hashService;

    @Autowired
    private UrlService urlService;

    @Override
    public Optional<Url> createShortUrl(String originalUrl) {
        String hash = hashService.getHash(originalUrl).substring(0, 16);
        logger.debug("Generated hash for original URL '{}': {}", originalUrl, hash);

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
        // return urlService.save(url);
        try {
            var persistedUrl = urlService.save(url);
            logger.debug("Successfully persisted URL: {}", url.getOriginalUrl());
            return persistedUrl;
        } catch (Exception e) {
            logger.error("Error occurred while persisting URL '{}'", url.getOriginalUrl(), e);
            throw e;
        }
    }

    @Override
    public Optional<Url> getEncodedUrl(String shortUrl) {
        // return urlService.getUrlByShortUrl(shortUrl);
        try {
            var url = urlService.getUrlByShortUrl(shortUrl);
            if (url.isPresent()) {
                logger.debug("Successfully retrieved encoded URL for '{}'", shortUrl);
            } else {
                logger.warn("Encoded URL not found for '{}'", shortUrl);
            }
            return url;
        } catch (Exception e) {
            logger.error("Error occurred while retrieving encoded URL for '{}'", shortUrl, e);
            throw e;
        }
    }
}
