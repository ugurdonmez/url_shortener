package com.example.demo.service;

import com.example.demo.exception.DatabaseWriteException;
import com.example.demo.model.Url;
import com.example.demo.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Component
public class UrlServiceImpl implements UrlService {

    @Autowired
    private UrlRepository urlRepository;

    @Override
    public Optional<Url> getUrlByShortUrl(String shortUrl) {
        var url = urlRepository.findByShortUrl(shortUrl)
                .orElseThrow(() -> {
                    return new EntityNotFoundException("Short url not found.");
                });
        return Optional.of(url);
    }

    @Override
    public Optional<Url> getUrlByOriginalUrl(String originalUrl) {
        var url = urlRepository.findByOriginalUrl(originalUrl);
        return url;
    }

    @Override
    public Optional<Url> save(Url url) {
        try {
            return Optional.of(urlRepository.save(url));
        } catch (DataAccessException e) {
            throw new DatabaseWriteException("Failed to write URL to the database", e);
        }
    }
}
