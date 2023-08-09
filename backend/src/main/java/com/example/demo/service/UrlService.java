package com.example.demo.service;

import com.example.demo.model.Url;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UrlService {

    Optional<Url> getUrlByShortUrl(String shortUrl);

    Optional<Url> getUrlByOriginalUrl(String originalUrl);

    Optional<Url> save(Url url);
}
