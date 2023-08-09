package com.example.demo.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.error("Malformed JSON request", ex);
        String error = "Malformed JSON request";
        return buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST, error, ex));
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {
        logger.error("Entity not found", ex);
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(DatabaseWriteException.class)
    public ResponseEntity<Object> handleDatabaseWriteException(DatabaseWriteException e) {
        logger.error("Database write exception", e);
        // TODO: do not send db related error to end users
        var apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        return buildResponseEntity(apiError);
    }

    @ExceptionHandler(HashCreationException.class)
    public ResponseEntity<Object> handleHashCreationException(HashCreationException e) {
        logger.error("Hash creation exception", e);
        var apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        return buildResponseEntity(apiError);
    }
}
