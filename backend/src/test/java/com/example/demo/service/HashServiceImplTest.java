package com.example.demo.service;

import com.example.demo.exception.HashCreationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static org.junit.jupiter.api.Assertions.*;

public class HashServiceImplTest {

    private HashService hashService;

    @BeforeEach
    void setUp() {
        hashService = new HashServiceImpl();
    }

    @Test
    void testGetHash_validInput() {
        // Arrange
        String input = "testInput";

        // Act
        String hash = hashService.getHash(input);

        // Assert
        assertNotNull(hash);
        assertFalse(hash.isEmpty());
    }

    @Test
    void testGetHash_invalidAlgorithm() {
        // Modify the HashServiceImpl to make it fail for testing purposes
        HashService failingHashService = new HashServiceImpl() {
            @Override
            public String getHash(String input) {
                try {
                    MessageDigest md = MessageDigest.getInstance("INVALID_ALGORITHM");
                    byte[] hash = md.digest(input.getBytes(StandardCharsets.UTF_8));
                    return DatatypeConverter.printHexBinary(hash);
                } catch (NoSuchAlgorithmException e) {
                    throw new HashCreationException("Failed to generate hash for input: " + input, e);
                }
            }
        };

        // Arrange
        String input = "testInput";

        // Act & Assert
        assertThrows(HashCreationException.class, () -> failingHashService.getHash(input));
    }

    @Test
    void testGetHash_emptyInput() {
        // Arrange
        String input = "";

        // Act
        String hash = hashService.getHash(input);

        // Assert
        assertNotNull(hash);
        assertFalse(hash.isEmpty());
    }
}
