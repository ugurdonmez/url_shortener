package com.example.demo.service;

import com.example.demo.model.Url;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UrlShortenerService {

    Optional<Url> createShortUrl(String url);

    Optional<Url> persistShortUrl(Url url);

    Optional<Url> getEncodedUrl(String url);
}
