package com.example.demo.repository;

import com.example.demo.model.Url;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlRepository  extends CrudRepository<Url, Long> {
    Optional<Url> findByShortUrl(String shortUrl);

    Optional<Url> findByOriginalUrl(String originalUrl);
}
