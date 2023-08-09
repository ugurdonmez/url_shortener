package com.example.demo.service;

import com.example.demo.exception.DatabaseWriteException;
import com.example.demo.model.Url;
import com.example.demo.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class UrlServiceImpl implements UrlService {

    private static final Logger logger = LoggerFactory.getLogger(UrlServiceImpl.class);

    @Autowired
    private UrlRepository urlRepository;

    @Override
    public Optional<Url> getUrlByShortUrl(String shortUrl) {
        var url = urlRepository.findByShortUrl(shortUrl)
                .orElseThrow(() -> {
                    logger.warn("Failed to find short URL: {}", shortUrl);
                    return new EntityNotFoundException("Short url not found.");
                });
        logger.debug("Successfully retrieved short URL: {}", shortUrl);
        return Optional.of(url);
    }

    @Override
    public Optional<Url> getUrlByOriginalUrl(String originalUrl) {
        var url = urlRepository.findByOriginalUrl(originalUrl);
        if (url.isPresent()) {
            logger.debug("Successfully retrieved original URL: {}", originalUrl);
        } else {
            logger.warn("Original URL not found: {}", originalUrl);
        }
        return url;
    }

    @Override
    public Optional<Url> save(Url url) {
        try {
            var savedUrl = Optional.of(urlRepository.save(url));
            logger.debug("Successfully saved URL: {}", url.getOriginalUrl());
            return savedUrl;
        } catch (DataAccessException e) {
            logger.error("Failed to write URL to the database: {}", url.getOriginalUrl(), e);
            throw new DatabaseWriteException("Failed to write URL to the database", e);
        }
    }
}
