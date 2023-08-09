package com.example.demo.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ApiErrorTest {

    @Test
    public void testConstructorWithStatus() {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ApiError apiError = new ApiError(status);

        assertEquals(status, apiError.getStatus());
        assertNotNull(apiError.getTimestamp());
        assertEquals(apiError.getTimestamp().truncatedTo(ChronoUnit.SECONDS), LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
    }

    @Test
    public void testConstructorWithStatusAndThrowable() {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Exception exception = new Exception("This is a test exception");
        ApiError apiError = new ApiError(status, exception);

        assertEquals(status, apiError.getStatus());
        assertEquals("Unexpected error", apiError.getMessage());
        assertEquals(exception.getLocalizedMessage(), apiError.getDebugMessage());
    }

    @Test
    public void testConstructorWithStatusMessageAndThrowable() {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String message = "A custom error message";
        Exception exception = new Exception("This is a test exception");
        ApiError apiError = new ApiError(status, message, exception);

        assertEquals(status, apiError.getStatus());
        assertEquals(message, apiError.getMessage());
        assertEquals(exception.getLocalizedMessage(), apiError.getDebugMessage());
    }
}
