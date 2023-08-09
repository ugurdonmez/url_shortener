package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public interface HashService {
    String getHash(String input);
}
