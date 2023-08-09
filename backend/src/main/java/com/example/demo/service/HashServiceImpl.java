package com.example.demo.service;

import com.example.demo.exception.HashCreationException;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class HashServiceImpl implements HashService {

    private static final Logger logger = LoggerFactory.getLogger(HashServiceImpl.class);

    @Override
    public String getHash(String input) {
        String hashValue = "";
        try {
            logger.debug("Generating hash for input: {}", input);
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(input.getBytes(StandardCharsets.UTF_8));
            hashValue = DatatypeConverter.printHexBinary(hash);

        } catch (Exception e) {
            logger.error("Failed to generate hash for input: {}", input, e);
            throw new HashCreationException("Failed to generate hash for input: " + input, e);
        }
        return hashValue;
    }
}
