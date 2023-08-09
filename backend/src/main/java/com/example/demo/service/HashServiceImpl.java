package com.example.demo.service;

import com.example.demo.exception.HashCreationException;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class HashServiceImpl implements HashService {

    @Override
    public String getHash(String input) {
        String hashValue = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(input.getBytes(StandardCharsets.UTF_8));
            hashValue = DatatypeConverter.printHexBinary(hash);

        } catch (Exception e) {
            throw new HashCreationException("Failed to generate hash for input: " + input, e);
        }
        return hashValue;
    }
}
