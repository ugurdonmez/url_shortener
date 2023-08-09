package com.example.demo.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GlobalExceptionHandlerTest.TestController.class)
public class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(new TestController())
                .setControllerAdvice(globalExceptionHandler)
                .build();
    }

    @Test
    public void testHandleEntityNotFound() throws Exception {
        mockMvc.perform(get("/notFound"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testHandleDatabaseWriteException() throws Exception {
        mockMvc.perform(get("/dbError"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void testHandleHashCreationException() throws Exception {
        mockMvc.perform(get("/hashError"))
                .andExpect(status().isInternalServerError());
    }

    @RestController
    public static class TestController {

        @GetMapping("/notFound")
        public void notFound() {
            throw new EntityNotFoundException("Entity not found");
        }

        @GetMapping("/dbError")
        public void dbError() {
            throw new DatabaseWriteException("DB error");
        }

        @GetMapping("/hashError")
        public void hashError() {
            throw new HashCreationException("Hash creation error");
        }
    }
}
